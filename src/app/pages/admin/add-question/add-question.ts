import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question-service';
import Swal from 'sweetalert2';


// ✅ Import CKEditor modules
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    JsonPipe,
    CommonModule,
    CKEditorModule
  ],
  templateUrl: './add-question.html',
  styleUrls: ['./add-question.css']
})
export class AddQuestion {

  public Editor: any = ClassicEditor;

  qId: any;
  qTitle: any;
  question = {
    quiz: { qid: null },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  };

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.qId = this.route.snapshot.params['qid'];
    this.qTitle = this.route.snapshot.params['title'];
    this.question.quiz.qid = this.qId;
  }

  addQuestion() {
    if (!this.question.content.trim()) return;
    if (!this.question.option1.trim()) return;
    if (!this.question.option2.trim()) return;
    if (!this.question.answer.trim()) return;

    this.questionService.addQuestion(this.question).subscribe(
      (data) => {
        Swal.fire('Success', 'Question added successfully', 'success').then(() => {
          console.log(data);
          this.question.content = '';
          this.question.option1 = '';
          this.question.option2 = '';
          this.question.option3 = '';
          this.question.option4 = '';
          this.question.answer = '';
        });
      },
      (error) => {
        console.error('Error adding question:', error);
        Swal.fire('Error', 'Failed to add question', 'error');
      }
    );
  }
}
