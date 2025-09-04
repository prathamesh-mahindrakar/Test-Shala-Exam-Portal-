import { CommonModule, LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuizService } from '../../../services/quiz-service';
import { QuestionService } from '../../../services/question-service';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-start',
  imports: [CommonModule, MatCardModule, MatDivider, MatButtonModule, FormsModule, RouterLink, MatProgressSpinnerModule, MatRadioModule],
  templateUrl: './start.html',
  styleUrl: './start.css'
})

export class Start {

  qid: any;
  questions: any;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;

  timer: any;

  constructor(private locationSt: LocationStrategy, private route: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit() {
    this.preventBackButton();
    this.qid = this.route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();

  }

  loadQuestions() {
    this.questionService.getQuestionsByQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        this.timer = this.questions.length * 2 * 60; // 2 minutes per question
        this.questions.forEach((q: any) => {
          q['selectedOption'] = '';
          console.log(this.questions);
          this.startTimer();

        });
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      }
    );
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      icon: 'info'
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        clearInterval(t);
        this.evalQuiz();
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  evalQuiz() {

    this.questionService.evalQuiz(this.questions).subscribe(
      (data: any) => {
        console.log(data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in submitting quiz', 'error');
      }
    );

    // this.isSubmit = true;

    // this.questions.forEach((question: any) => {
    //   if (question.selectedOption === question.answer) {
    //     this.correctAnswers++;
    //     let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
    //     this.marksGot += marksSingle;
    //   }

    //   if (question.selectedOption.trim() !== '') {
    //     this.attempted++;
    //   }

    // });

    // console.log("Correct Answers: " + this.correctAnswers);
    // console.log("Marks Got: " + this.marksGot);
    // console.log("Attempted: " + this.attempted);
    // console.log(this.questions);

  }

  printResult() {
    window.print();
  }
}
