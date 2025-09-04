import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CategoryService } from '../../../services/category-service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-view-categories',
  imports: [MatCardModule, MatListModule, MatIconModule, CommonModule, RouterLink],
  templateUrl: './view-categories.html',
  styleUrls: ['./view-categories.css']
})
export class ViewCategories {

  categories: any = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
      console.log(this.categories);
    }, (error) => {
      console.log(error);
      Swal.fire('Error !!', 'Error in loading categories', 'error');

    });
  }


}
