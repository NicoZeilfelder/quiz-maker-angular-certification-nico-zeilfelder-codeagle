import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question, Quiz, TriviaCategories} from "../model/quiz.model";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private httpClient: HttpClient) {
  }

  public getCategories(): Observable<TriviaCategories> {
    return this.httpClient.get('https://opentdb.com/api_category.php') as Observable<TriviaCategories>;
  }

  public getQuestions(categoryId: number, difficulty: string): Observable<Quiz> {
    const amount: number = 5;
    const type: string = 'multiple';

    const uri = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=${type}`;

    return this.httpClient.get(uri) as Observable<Quiz>;
  }
}
