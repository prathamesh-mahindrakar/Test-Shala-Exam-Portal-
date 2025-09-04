import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuizService } from '../../../services/quiz-service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-load-quiz',
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './load-quiz.html',
  styleUrl: './load-quiz.css'
})
export class LoadQuiz {

  catId: any;
  quizzes: any;

  constructor(private route: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.catId = params['catId'];

      if (this.catId == 0) {
        console.log("Load All the Quiz");
        this.quizService.getActiveQuizzes().subscribe(
          (data: any) => {
            this.quizzes = data;
            console.log(this.quizzes);
          },
          (error) => {
            console.log(error);
            alert("Error in loading all quizzes");
          }
        );

      } else {
        console.log("Load Specific Quiz");
        this.quizService.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data: any) => {
            this.quizzes = data;
            console.log(this.quizzes);
          },
          (error) => {
            console.log(error);
            alert("Error in loading quizzes of specific category");
          }
        );
      }
    });



  }

}
