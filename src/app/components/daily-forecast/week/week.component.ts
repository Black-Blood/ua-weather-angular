import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {
  days = [0, 1, 2, 3, 4, 5, 6]

  constructor(
    public api: APIService
  ) { }

  ngOnInit(): void {
  }

  CreateWeekDay(day: number) {
    let oneDay = 24 * 3600 * 1000
    return new Date(new Date().getTime() + day * oneDay)
  }

  WeekButtonClick(event: MouseEvent, day: number) {
    let button = <HTMLButtonElement>event.currentTarget

    if (!button.classList.contains("active")) {
      this.api.activeDay = day
    }
  }

}
