import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { QuizStartPageComponent } from './pages/quiz-start-page/quiz-start-page.component';
import { QuizResultPageComponent } from './pages/quiz-result-page/quiz-result-page.component';
import {RouterModule} from "@angular/router";
import {QuizService} from "./services/quiz.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import { QuizComponent } from './shared/components/quiz/quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizStartPageComponent,
    QuizResultPageComponent,
    QuizComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
