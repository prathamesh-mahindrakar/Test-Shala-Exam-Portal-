import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';  // ✅ add Router
import { QuestionService } from '../../../services/question-service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-quiz-questions',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDivider, MatButtonModule, RouterLink],
  templateUrl: './view-quiz-questions.html',
  styleUrls: ['./view-quiz-questions.css']   // ✅ plural `styleUrls`
})
export class ViewQuizQuestions {

  qId: any;
  qTitle: any;
  questions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,   // ✅ inject Router
    private questionService: QuestionService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.qId = this.route.snapshot.params['id'];
    this.qTitle = this.route.snapshot.params['title'];

    this.questionService.getQuestionsByQuizId(this.qId).subscribe(
      (data: any) => {
        this.questions = data;
        console.log(this.questions);
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  deleteQuestion(qId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(qId).subscribe(
          (response) => {
            this.matSnackBar.open('Question deleted successfully', '', {
              duration: 3000
            });
            this.questions = this.questions.filter(q => q.quesid !== qId);
          },
          (error) => {
            this.matSnackBar.open('Failed to delete question', '', {
              duration: 3000
            });
            console.log(error);
          }
        );
      }
    });
  }

  // ✅ Navigate to Update Page
  editQuestion(qId: any) {
    this.router.navigate(['/admin/update-question', qId]);
  }

}
