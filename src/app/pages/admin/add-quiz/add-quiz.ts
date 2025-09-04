import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2';
import { FormsModule, NgModel, NgModelGroup } from '@angular/forms';
import { CategoryService } from '../../../services/category-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz-service';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './add-quiz.html',
  styleUrl: './add-quiz.css'
})
export class AddQuiz {
  categories: any[] = [];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    isActive: true,
    category: {
      cid: ''
    }
  }

  constructor(private categoryService: CategoryService, private matSnackBar: MatSnackBar, private quizService: QuizService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log('Loaded categories:', this.categories);
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error !!', 'Failed to load categories', 'error');
      }
    });
  }

  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this.matSnackBar.open('Quiz title is required', '', { duration: 3000 });
      return;
    }

    this.quizService.addQuiz(this.quizData).subscribe((data: any) => {
      Swal.fire('Success !!', 'Quiz added successfully', 'success');
      this.quizData = {
        title: '',
        description: '',
        maxMarks: '',
        numberOfQuestions: '',
        isActive: true,
        category: {
          cid: ''
        }
      };
    }, (error) => {
      console.error(error);
      Swal.fire('Error !!', 'Failed to add quiz', 'error');
    });
  }
}
