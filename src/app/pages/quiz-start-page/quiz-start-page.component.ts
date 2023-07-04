import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {QuizService} from "../../services/quiz.service";
import {Category, CustomQuestion, Difficulty, Question, Quiz, TriviaCategories} from "../../model/quiz.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-quiz-start-page',
  templateUrl: './quiz-start-page.component.html',
  styleUrls: ['./quiz-start-page.component.css']
})
export class QuizStartPageComponent implements OnInit, OnDestroy {
  public categories: Category[] = [];
  public difficulties: string[] = Object.values(Difficulty);
  public questions: Question[] = [];

  public selectedCategory!: number;
  public selectedDifficulty!: string;

  private subscriptions: Subscription[] = [];

  constructor(private quizService: QuizService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(this.quizService.getCategories()
      .subscribe((data: TriviaCategories) => {
          this.categories = data?.trivia_categories;
    }));
  }

  public createQuiz(): void {
    this.subscriptions.push(this.quizService.getQuestions(this.selectedCategory, this.selectedDifficulty)
      .subscribe((data: Quiz) => {
        this.questions = data.results;
    }));
  }

  public submitQuiz(customQuestions: CustomQuestion[]): void {
    console.log(customQuestions)
    // this.router.navigate(['results'])
  }

  public ngOnDestroy(): void {
    this.subscriptions?.forEach((subscription: Subscription) => subscription?.unsubscribe());
  }
}
