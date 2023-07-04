import {RouterModule, Routes} from "@angular/router";
import {QuizStartPageComponent} from "./pages/quiz-start-page/quiz-start-page.component";
import {QuizResultPageComponent} from "./pages/quiz-result-page/quiz-result-page.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  { path: 'start', component: QuizStartPageComponent },
  { path: 'results', component: QuizResultPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
