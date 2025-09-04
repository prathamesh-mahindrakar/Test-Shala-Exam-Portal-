import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { LoginService } from '../../services/login-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [MatCardModule, MatTableModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

  user: any = {};


  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.user = this.loginService.getUser();
    // this.loginService.getCurrentUser().subscribe(
    //   (data: any) => {
    //     this.user = data;
    //   },
    //   (error: any) => {
    //     console.error('Error fetching user data:', error);
    //   }
    // );
  }
}




