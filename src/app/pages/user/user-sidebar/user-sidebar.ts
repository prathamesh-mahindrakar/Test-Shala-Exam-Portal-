import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatActionList, MatListModule } from '@angular/material/list';
import { CategoryService } from '../../../services/category-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-sidebar',
  imports: [MatCardModule, MatActionList, MatIcon, CommonModule, MatListModule, RouterLink],
  templateUrl: './user-sidebar.html',
  styleUrl: './user-sidebar.css'
})
export class UserSidebar {

  categories: any;

  constructor(private categoryService: CategoryService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    }, error => {
      this.snackBar.open('Failed to load categories', '', {
        duration: 3000
      });
    });
  }

}
