import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {

  constructor(
    public api: APIService
  ) { }

  ngOnInit(): void {
  }

  OpenSelectLanguageList($event: MouseEvent, selectList: HTMLElement) {
    $event.preventDefault()

    let button: HTMLButtonElement = <HTMLButtonElement>$event.currentTarget

    button.classList.toggle("active")
    selectList.classList.toggle("active")
  }


  SelectLanguage($event: MouseEvent, language: string, button: HTMLButtonElement, selectList: HTMLElement) {
    $event.preventDefault()
    if (this.api.vocabulary?.language.abbr != language) {
      button.classList.toggle("active")
      selectList.classList.toggle("active")

      this.api.GetVocabulary(language)
      this.api.GetWeather(language)
    }
  }

}
