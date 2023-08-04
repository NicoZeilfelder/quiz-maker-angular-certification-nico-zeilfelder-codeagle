import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {QuizService} from "../../services/quiz.service";
import {
    Category,
    CategoryWithSubCategories,
    ChangedQuestion,
    CustomQuestion,
    Difficulty,
    Question,
    Quiz,
    TriviaCategories
} from "../../shared/model/quiz.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-quiz-start-page',
    templateUrl: './quiz-start-page.component.html',
    styleUrls: ['./quiz-start-page.component.css']
})
export class QuizStartPageComponent implements OnInit, OnDestroy {
    public categoriesWithSubCategories: string[] = Object.values(CategoryWithSubCategories);
    public allCategories: Category[] = [];
    public filteredCategories: Category[] = [];
    public difficulties: string[] = Object.values(Difficulty);
    public questions: Question[] = [];

    public selectedCategoryWithSubCategories!: string;
    public selectedCategory!: number;
    public selectedDifficulty!: string;

    public isQuizCreated: boolean = false;
    public changedQuestion: ChangedQuestion | undefined = undefined;

    private subscriptions: Subscription[] = [];

    constructor(private quizService: QuizService,
                private router: Router) {
    }

    public ngOnInit(): void {
        this.subscriptions.push(this.quizService
            .getCategories()
            .subscribe((data: TriviaCategories) => {
                this.allCategories = data?.trivia_categories;
                this.filteredCategories = [...this.allCategories];
            }));
    }

    public filterCategories(): void {
        this.filteredCategories = this.allCategories;

        if (this.selectedCategoryWithSubCategories) {
            this.filteredCategories = this.allCategories.filter((c: Category) => c.name.startsWith(this.selectedCategoryWithSubCategories));
        }
    }

    public createQuiz(): void {
        this.subscriptions.push(this.quizService
            .getQuiz(this.selectedCategory, this.selectedDifficulty)
            .subscribe((data: Quiz) => {
                this.questions = data.results;
                this.isQuizCreated = true;
            }));
    }

    public changeQuestion(question: string): void {
        const allQuestions = this.questions.map((q: Question) => q.question);

        this.subscriptions.push(this.quizService
            .getQuiz(this.selectedCategory, this.selectedDifficulty, 1)
            .subscribe((data: Quiz) => {
                if (allQuestions.includes(data.results[0].question)) {
                    this.changeQuestion(question);
                    return;
                }

                this.changedQuestion = {
                    oldQuestion: question,
                    newQuestion: data.results[0]
                };
            }));
    }

    public submitQuiz(customQuestions: CustomQuestion[]): void {
        this.quizService.customQuestions = customQuestions;
        this.router.navigate(['results'], {state: {customQuestions}});
    }

    public ngOnDestroy(): void {
        this.subscriptions?.forEach((subscription: Subscription) => subscription?.unsubscribe());
    }
}
