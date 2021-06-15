import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DailyForecastComponent } from './components/daily-forecast/daily-forecast.component';
import { SearchSettlementComponent } from './components/header/search-settlement/search-settlement.component';
import { SelectLanguageComponent } from './components/header/select-language/select-language.component';
import { FirstLoadingComponent } from './components/first-loading/first-loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DailyForecastComponent,
    SearchSettlementComponent,
    SelectLanguageComponent,
    FirstLoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
