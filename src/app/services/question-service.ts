import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) { }

  public getQuestionsByQuizId(quizId: number) {
    return this.http.get(`${baseUrl}/question/quiz/all/${quizId}`);
  }

  public getQuestionsByQuizForTest(quizId: number) {
    return this.http.get(`${baseUrl}/question/quiz/${quizId}`);
  }

  public addQuestion(question: any) {
    return this.http.post(`${baseUrl}/question/`, question);
  }

  public deleteQuestion(questionId: any) {
    return this.http.delete(`${baseUrl}/question/${questionId}`);
  }

  public updateQuestion(question: any) {
    return this.http.put(`${baseUrl}/question/${question.quesid}`, question);
  }

  public evalQuiz(questions: any) {
    return this.http.post(`${baseUrl}/question/eval-quiz`, questions);
  }

  public getQuestion(questionId: number) {
    return this.http.get(`${baseUrl}/question/${questionId}`);
  }
}
