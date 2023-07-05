import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CustomQuestion, Question} from "../../../model/quiz.model";

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
    get customQuestions(): CustomQuestion[] {
        return this._customQuestions;
    }

    get questions(): Question[] {
        return this._questions;
    }

    @Input()
    set customQuestions(value: CustomQuestion[]) {
        this._customQuestions = value;
        this.isSubmitted = true;
        this.setNumberOfCorrectAnswers();
    }

    @Input()
    set questions(value: Question[]) {
        this._questions = value;
        this._customQuestions = value?.map((question: Question) => {
            return {
                question: question.question,
                answers: [question.correct_answer, ...question.incorrect_answers],
                correct_answer: question.correct_answer,
                selected_answers: []
            }
        });

        this._customQuestions?.forEach((c: CustomQuestion) => {
            c.answers = c.answers.sort(() => Math.random() > 0.5 ? 1 : -1);
        })
    }

    @Output() quizSubmitted: EventEmitter<CustomQuestion[]> = new EventEmitter<CustomQuestion[]>();

    public isSubmitted: boolean = false;
    public numberOfCorrectAnswers: number = 0;

    private _customQuestions: CustomQuestion[] = [];
    private _questions: Question[] = [];

    public getDecodedString(answer: string): string {
        return answer
            .replace('&amp;', '&')
            .replace('&apos;', "'")
            .replace('&quot;', '"')
            .replace('&gt;', '>')
            .replace('&lt;', '<');
    }

    public selectAnswer(question: string, answer: string): void {
        const customQuestion: CustomQuestion | undefined = this._customQuestions?.find((c: CustomQuestion) => c.question === question);
        const index: number | undefined = customQuestion?.selected_answers.indexOf(answer);

        if (index !== undefined && index >= 0) {
            customQuestion?.selected_answers?.splice(index, 1)
        }

        if (index === -1) {
            customQuestion?.selected_answers.push(answer);
        }
    }

    public isAnswerSelected(customQuestion: CustomQuestion, answer: string): boolean {
        return customQuestion?.selected_answers.indexOf(answer) >= 0;
    }

    public isAnswerCorrect(customQuestion: CustomQuestion, answer: string): boolean {
        return customQuestion.correct_answer === answer;
    }

    public setNumberOfCorrectAnswers(): void {
        this.numberOfCorrectAnswers = 0;

        this.customQuestions?.forEach((c: CustomQuestion) => {
            if (c.selected_answers.includes(c.correct_answer)) {
                this.numberOfCorrectAnswers++;
            }
        });
    }

    public getScoreColor(): string {
        if (this.numberOfCorrectAnswers >= 4) {
            return 'green';
        } else if (this.numberOfCorrectAnswers >= 2) {
            return 'yellow';
        } else {
            return 'red';
        }
    }

    public showSubmitButton(): boolean {
        return !this.isSubmitted && this.customQuestions?.length > 0 && this.customQuestions?.every((c: CustomQuestion) => c.selected_answers.length > 0);
    }

    public submitQuiz(): void {
        if (this.showSubmitButton()) {
            this.isSubmitted = true;
            this.quizSubmitted.emit(this.customQuestions);
        }
    }
}
