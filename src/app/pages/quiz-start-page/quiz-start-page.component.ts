import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {QuizService} from "../../services/quiz.service";
import {
    Category,
    CategoryWithSubCategories,
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
