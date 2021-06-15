import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { ISettlement } from 'src/app/services/interfaces';

@Component({
  selector: 'app-search-settlement',
  templateUrl: './search-settlement.component.html',
  styleUrls: ['./search-settlement.component.scss']
})
export class SearchSettlementComponent implements OnInit {
  listOfFoundSettlement: ISettlement[] = []
  buttonText: string | undefined

  constructor(
    public api: APIService
  ) { }

  ngOnInit(): void {
  }

  async InputSearch(inputEvent: Event) {
    inputEvent.preventDefault()
    let inputElement = <HTMLInputElement>inputEvent.currentTarget

    if (inputElement.value.length >= 3) {
      this.listOfFoundSettlement = await this.api.SearchSettlement(this.api.languageAbbr, inputElement.value)
    }

    if (inputElement.value.length < 3) {
      this.api.searchSettlementStatus = "empty"
      this.listOfFoundSettlement = []
    }
  }

  PrepareButton(searchString: string, arrayIndex: number): boolean {
    let settlement = this.listOfFoundSettlement[arrayIndex]

    let settlementName: string = settlement.names[this.api.languageAbbr]
    let areaName: string = settlement?.areaNames?.[this.api.languageAbbr] || ""
    let regionName: string = settlement?.regionNames?.[this.api.languageAbbr] || ""

    let searchArray = searchString.split(",")
    let templateArray = [
      settlementName.toLowerCase(),
      (areaName !== undefined) ? areaName.toLowerCase() : undefined,
      (regionName !== undefined) ? regionName.toLowerCase() : undefined
    ]
    let resultArr: string[] = []


    // прибираємо пробіли, підводимо до нижнього регістру, ставимо символи пробілу
    searchArray.forEach((temp, index) => {
      temp = temp.trim()
      temp = temp.toLowerCase()
      temp = temp.replace(new RegExp(" ", "gi"), "&nbsp;")

      searchArray[index] = temp
    })
    templateArray.forEach((temp, index) => {
      if (temp !== undefined) {
        temp = temp.trim()
        temp = temp.toLowerCase()
        temp = temp.replace(new RegExp(" ", "gi"), "&nbsp;")

        templateArray[index] = temp
      }
    })

    // підготовка результату
    settlementName = settlementName.replace(new RegExp(" ", "gi"), "&nbsp;")
    areaName = (areaName !== undefined) ? areaName.replace(new RegExp(" ", "gi"), "&nbsp;") : ""
    regionName = (regionName !== undefined) ? regionName.replace(new RegExp(" ", "gi"), "&nbsp;") : ""
    resultArr.push(settlementName, areaName, regionName)

    // заміна підрядка
    templateArray.forEach((template, index) => {
      if (searchArray[index] != undefined) {
        let start = template?.indexOf(searchArray[index]) || 0
        let end = start + searchArray[index].length

        let substring = resultArr[index].slice(start, end)
        resultArr[index] = resultArr[index].replace(substring, `<span class="includes">${substring}</span>`)
      }
    })

    let result = resultArr[0] +
      ((resultArr[1] !== "") ? (",&nbsp;" + resultArr[1]) : "") +
      ((resultArr[2] !== "") ? (",&nbsp;" + resultArr[2]) : "")

    this.buttonText = result
    return true
  }

  //! Пошук погоди через пошук
  async GetWeather(settlement: ISettlement, searchInput: HTMLInputElement) {
    this.api.settlement = settlement
    this.SetInputValue(searchInput)

    await this.api.GetWeather(this.api.languageAbbr)
  }


  private SetInputValue(searchInput: HTMLInputElement) {
    let settlementName = this.api.settlement?.names[this.api.languageAbbr]
    let settlementArea = this.api.settlement?.areaNames?.[this.api.languageAbbr]
    let settlementRegion = this.api.settlement?.regionNames?.[this.api.languageAbbr]

    let newInputValue = settlementName +
      ((settlementArea !== undefined) ? ", " + settlementArea : "") +
      ((settlementRegion !== undefined) ? ", " + settlementRegion : "")

    searchInput.value = newInputValue
    this.api.searchSettlementStatus = "empty"
    this.api.PrepareURL(newInputValue)
  }

}
