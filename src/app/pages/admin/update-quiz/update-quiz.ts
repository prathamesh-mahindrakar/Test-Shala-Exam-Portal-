import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz-service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  imports: [CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,],
  templateUrl: './update-quiz.html',
  styleUrl: './update-quiz.css'
})
export class UpdateQuiz {

  qId = 0;
  quiz: any;
  categories: any[] = [];


  constructor(private route: ActivatedRoute, private quizService: QuizService, private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.qId = this.route.snapshot.params['qid'];
    // alert(this.qId);
    this.quizService.getSingleQuiz(this.qId).subscribe(data => {
      this.quiz = data;
      console.log(this.quiz);
    }, (error) => {
      console.log(error);
    });

    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
    }, (error) => {
      console.log(error);
      alert('Error while loading categories');
    });

  }

  public updateQuiz() {
    this.quizService.updateQuiz(this.quiz).subscribe((data) => {   // ✅ send quiz object
      console.log(data);
      Swal.fire('Success', 'Quiz updated successfully', 'success').then((e) => {
        this.router.navigate(['/admin/quizzes']);
      });
    }, (error) => {
      console.log(error);
      Swal.fire('Error', 'Error while updating quiz', 'error');
    });
  }



}
