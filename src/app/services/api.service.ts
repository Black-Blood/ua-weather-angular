import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICoordinates, IRequestsBody, ISettlement, ISettlementsWeather, IVocabulary } from './interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class APIService {
  languageAbbr = ""
  settlementFullName = ""

  weatherStatus: "loading" | "error" | "result" | "empty" = "empty"
  vocabularyStatus: "loading" | "error" | "result" | "empty" = "empty"
  searchSettlementStatus: "loading" | "error" | "result" | "empty" = "empty"

  weather: ISettlementsWeather | undefined = undefined
  vocabulary: IVocabulary | undefined = undefined
  settlement: ISettlement | undefined = undefined

  avalaibleLanguagesAbbr: string[] = []
  activeDay = 0

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  async GetVocabulary(languageAbbr: string): Promise<void> {
    this.vocabularyStatus = "loading"
    this.vocabulary = undefined

    let vocabularies =
      await this.GetVocabulariesFromLocalStorage()
      ||
      await this.GetVocabulariesFromServer()

    if (vocabularies === undefined) {
      this.vocabularyStatus = "error"
      return undefined
    }

    if (this.avalaibleLanguagesAbbr.length === 0)
      vocabularies.forEach(
        vocabulary => this.avalaibleLanguagesAbbr.push(vocabulary.language.abbr)
      )

    this.vocabulary =
      vocabularies.find(vocabulary => vocabulary.language.abbr === languageAbbr)
      ||
      vocabularies.find(vocabulary => vocabulary.language.abbr === "ua")

    this.vocabularyStatus = (this.vocabulary === undefined) ? "error" : "result"
    this.languageAbbr = this.vocabulary?.language.abbr || "ua"

    let settlementFullName = "" +
      this.settlement?.names[this.languageAbbr]

    if (this.settlement?.areaNames !== undefined) {
      settlementFullName += ", " + this.settlement?.areaNames[this.languageAbbr]
    }
    if (this.settlement?.regionNames !== undefined) {
      settlementFullName += ", " + this.settlement?.regionNames[this.languageAbbr]
    }

    this.PrepareURL(settlementFullName)
  }

  async GetWeather(languageAbbr: string, coordinates?: ICoordinates) {
    this.weatherStatus = "loading"
    this.weather = undefined

    this.weatherStatus = await fetch(`https://ua-weather-backend.herokuapp.com/getWeather`, {
      method: "Post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(<IRequestsBody>{
        language: languageAbbr,
        coordinates: coordinates || this.settlement?.coordinates
      })
    })
      .then(res => res.json())
      .then(
        (data) => {
          this.weather = JSON.parse(data)
          return "result"
        },
        () => "error"
      )
  }

  async SearchSettlement(languageAbbr: string, searchString: string): Promise<ISettlement[]> {
    this.searchSettlementStatus = "loading"

    return await fetch(`https://ua-weather-backend.herokuapp.com/findSettlement`, {
      method: "Post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(<IRequestsBody>{
        language: languageAbbr,
        searchSettlement: searchString
      })
    }).then(res => res.json()).then(
      (data) => {
        this.searchSettlementStatus = "result"
        return <ISettlement[]>JSON.parse(data)
      },
      () => {
        this.searchSettlementStatus = "error"
        return []
      }
    )
  }

  PrepareURL(settlementFullName: string) {
    settlementFullName = settlementFullName.replace(new RegExp(", ", 'g'), ",");
    settlementFullName = settlementFullName.replace(new RegExp(" ", 'g'), "_");

    let url = this.languageAbbr + "/" + settlementFullName
    this.router.navigateByUrl(url)
  }

  ParseURL(settlementFullName: string) {
    settlementFullName = settlementFullName.replace(new RegExp(",", 'g'), ", ");
    settlementFullName = settlementFullName.replace(new RegExp("_", 'g'), " ");

    return settlementFullName
  }

  private async GetVocabulariesFromLocalStorage(): Promise<IVocabulary[] | undefined> {
    let dataFromStorage = localStorage.getItem("vocabularies")
    if (dataFromStorage === null)
      return undefined

    return JSON.parse(dataFromStorage)
  }

  private async GetVocabulariesFromServer(): Promise<IVocabulary[] | undefined> {
    return this.http.get('/assets/data/vocabularies.json').toPromise().then(
      (data) => {
        localStorage.setItem("vocabularies", JSON.stringify(data))
        return <IVocabulary[]>data
      },
      () => undefined
    )
  }
}
