import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-quiz-start-page-result-page',
  templateUrl: './quiz-result-page.component.html',
  styleUrls: ['./quiz-result-page.component.css']
})
export class QuizResultPageComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public createNewQuiz(): void {
    this.router.navigate(['start']);
  }
}
