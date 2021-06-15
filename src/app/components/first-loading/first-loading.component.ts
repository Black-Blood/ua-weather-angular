import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { switchMap } from "rxjs/operators"
import { APIService } from "src/app/services/api.service"

@Component({
  selector: "app-first-loading",
  templateUrl: "./first-loading.component.html",
  styleUrls: ["./first-loading.component.scss"]
})
export class FirstLoadingComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public api: APIService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap(params => params.getAll("language")))
      .subscribe(languageAbbr => this.api.languageAbbr = languageAbbr.toLowerCase())

    this.route.paramMap.pipe(switchMap(params => params.getAll("settlementFullName")))
      .subscribe(settlementFullName => this.api.settlementFullName = settlementFullName)

    this.LoadInformation()
  }

  async LoadInformation() {
    let result = await this.api.SearchSettlement(this.api.languageAbbr, this.api.ParseURL(this.api.settlementFullName))
    this.api.searchSettlementStatus = "empty"

    result.forEach(settlement => {
      let temp = settlement.names[this.api.languageAbbr]

      if (settlement.areaNames !== undefined) {
        temp += ", " + settlement.areaNames[this.api.languageAbbr]
      }

      if (settlement.regionNames !== undefined) {
        temp += ", " + settlement.regionNames[this.api.languageAbbr]
      }


      if (temp == this.api.ParseURL(this.api.settlementFullName)) {
        this.api.settlement = settlement
      }
    })

    await this.api.GetVocabulary(this.api.languageAbbr)
    await this.api.GetWeather(this.api.languageAbbr)
  }
}
