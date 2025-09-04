import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { QuizService } from '../../../services/quiz-service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-quizzes',
  imports: [MatCardModule, NgFor, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './view-quizzes.html',
  styleUrl: './view-quizzes.css'
})
export class ViewQuizzes {
  quizzes: any[] = [];

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.getQuizzes().subscribe((data: any) => {
      this.quizzes = data;
      console.log(this.quizzes);
    },
      (error) => {
        console.log(error);
        Swal.fire("Error !!", "Failed to load quizzes", "error");
      }
    );
  }

  deleteQuiz(qid: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizService.deleteQuiz(qid).subscribe(data => {
          Swal.fire("Success !!", "Quiz deleted successfully", "success");
          this.quizzes = this.quizzes.filter(quiz => quiz.qid !== qid);
        }, (error) => {
          console.log(error);
          Swal.fire("Error !!", "Failed to delete quiz", "error");
        });
      }
    });
  }
}
