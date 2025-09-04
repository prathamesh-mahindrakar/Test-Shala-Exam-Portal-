import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css'
})
export class AddCategory {


  category = {
    title: '',
    description: ''
  };

  constructor(private categoryService: CategoryService, private matSnackBar: MatSnackBar) { }


  formSubmit() {
    if (this.category.title.trim() === '' || this.category.title == null) {
      this.matSnackBar.open('Title is required', 'Close', {
        duration: 3000
      });
      return;
    }


    this.categoryService.addCategory(this.category).subscribe((data: any) => {
      this.category.title = '';
      Swal.fire('Success !!', 'Category is added successfully', 'success');
    }, (error: any) => {
      Swal.fire('Server Error !!', 'Failed to add category', 'error');
      console.log(error);
    });
  }
}