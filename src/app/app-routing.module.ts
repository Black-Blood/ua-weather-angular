import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import { FirstLoadingComponent } from "./components/first-loading/first-loading.component"

const routes: Routes = [
  { path: "", redirectTo: "ua/Київ", pathMatch: "full" },
  { path: ":language/:settlementFullName", component: FirstLoadingComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
