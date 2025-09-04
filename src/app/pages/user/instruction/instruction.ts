import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuizService } from '../../../services/quiz-service';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instruction',
  imports: [MatCardModule, MatCardActions, MatDivider, MatButton],
  templateUrl: './instruction.html',
  styleUrl: './instruction.css'
})

export class Instruction {

  qid: any;
  quiz: any;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router) { }

  ngOnInit() {
    this.qid = this.route.snapshot.params['qid'];
    // console.log(this.qid);
    this.quizService.getSingleQuiz(this.qid).subscribe(
      (data: any) => {
        // console.log(data);
        this.quiz = data;
      },
      (error) => {
        console.log(error);
        alert('Error in loading quiz data');
      }
    );
  }

  startQuiz() {
    Swal.fire({
      title: 'Are you ready to start the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start Quiz',
      cancelButtonText: 'Cancel',
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/start', this.qid]);
      } else if (result.isDenied) {
        // Do nothing if cancelled
        Swal.fire('Quiz are not saved', '', 'info');
      }
    });
  }

}
