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
import {RemoveCategoryPrefixPipe} from "../../shared/pipes/remove-category-prefix.pipe";

@Component({
    selector: 'app-quiz-start-page',
    templateUrl: './quiz-start-page.component.html',
    styleUrls: ['./quiz-start-page.component.css']
})
export class QuizStartPageComponent implements OnInit, OnDestroy {
    public allCategories: Category[] = [];
    public allCategoryNames: string[] = [];
    public filteredCategories: Category[] = [];
    public difficulties: string[] = Object.values(Difficulty);
    public questions: Question[] = [];

    public selectedCategoryId!: number | undefined;
    public selectedSubCategoryId!: number | undefined;
    public selectedDifficulty!: string;

    public isQuizCreated: boolean = false;
    public changedQuestion: ChangedQuestion | undefined = undefined;
    public categoryPrefix: string = '';

    private subscriptions: Subscription[] = [];

    constructor(private quizService: QuizService,
                private removeCategoryPrefixPipe: RemoveCategoryPrefixPipe,
                private router: Router) {
    }

    public ngOnInit(): void {
        this.subscriptions.push(this.quizService
            .getCategories()
            .subscribe((data: TriviaCategories) => {
                this.allCategories = data?.trivia_categories;
                this.allCategoryNames = data?.trivia_categories
                    .map((c: Category) => c.name)
                    .filter((name: string) => !(name?.startsWith(CategoryWithSubCategories.ENTERTAINMENT) || (name?.startsWith(CategoryWithSubCategories.SCIENCE))));
                this.allCategoryNames.push(...Object.values(CategoryWithSubCategories));
                this.filteredCategories = [...this.allCategories];
            }));
    }

    public filterCategories(selectedOption: string): void {
        this.selectedCategoryId = this.allCategories.find((c: Category) => c.name === selectedOption)?.id;
        this.categoryPrefix = this.getCategoryPrefix(selectedOption);
        this.filteredCategories = this.allCategories;

        if (this.categoryPrefix) {
            this.filteredCategories = this.allCategories.filter((c: Category) => c.name?.startsWith(this.categoryPrefix));
        }
    }

    private getCategoryPrefix(category: string): string {
        if (category?.startsWith(CategoryWithSubCategories.ENTERTAINMENT)) {
            return CategoryWithSubCategories.ENTERTAINMENT
        } else if (category?.startsWith(CategoryWithSubCategories.SCIENCE)) {
            return CategoryWithSubCategories.SCIENCE
        } else {
            return '';
        }
    }

    public isSubCategorySelectVisible(): boolean {
        return this.categoryPrefix === CategoryWithSubCategories.ENTERTAINMENT ||
            this.categoryPrefix === CategoryWithSubCategories.SCIENCE;
    }

    public setSelectedCategory(selectedOption: Category): void {
        this.selectedSubCategoryId = selectedOption?.id;
    }

    public createQuiz(): void {
        const categoryId = this.selectedSubCategoryId || this.selectedCategoryId;

        if (categoryId && this.selectedDifficulty) {
            this.subscriptions.push(this.quizService
                .getQuiz(categoryId, this.selectedDifficulty)
                .subscribe((data: Quiz) => {
                    this.questions = data.results;
                    this.isQuizCreated = true;
                }));
        }
    }

    public changeQuestion(question: string): void {
        if (this.selectedSubCategoryId && this.selectedDifficulty) {
            const allQuestions = this.questions.map((q: Question) => q.question);

            this.subscriptions.push(this.quizService
                .getQuiz(this.selectedSubCategoryId, this.selectedDifficulty, 1)
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
    }

    public submitQuiz(customQuestions: CustomQuestion[]): void {
        this.quizService.customQuestions = customQuestions;
        this.router.navigate(['results'], {state: {customQuestions}});
    }

    public ngOnDestroy(): void {
        this.subscriptions?.forEach((subscription: Subscription) => subscription?.unsubscribe());
    }
}
