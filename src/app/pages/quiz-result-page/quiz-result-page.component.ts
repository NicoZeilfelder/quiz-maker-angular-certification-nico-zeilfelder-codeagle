import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {CustomQuestion} from "../../model/quiz.model";
import {QuizService} from "../../services/quiz.service";


@Component({
  selector: 'app-quiz-start-page-result-page',
  templateUrl: './quiz-result-page.component.html',
  styleUrls: ['./quiz-result-page.component.css']
})
export class QuizResultPageComponent implements OnInit {
  public customQuestions!: CustomQuestion[];

  constructor(private router: Router,
              private quizService: QuizService) {

  }

  ngOnInit(): void {
    this.customQuestions = this.quizService.customQuestions;
  }

  public createNewQuiz(): void {
    this.router.navigate(['start']);
  }
}
