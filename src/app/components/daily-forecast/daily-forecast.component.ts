import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss']
})
export class DailyForecastComponent implements OnInit {
  days = [0, 1, 2, 3, 4, 5, 6]

  constructor(
    public api: APIService,
  ) { }

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

  ngOnInit(): void { }
}
