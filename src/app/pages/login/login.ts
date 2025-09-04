import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginService } from '../../services/login-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, FormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginData = {
    username: '',
    password: ''
  };

  constructor(private matSnackBar: MatSnackBar, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  formSubmit() {
    console.log('Login form submitted');

    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.matSnackBar.open('Username is required !!', '', {
        duration: 3000
      });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.matSnackBar.open('Password is required !!', '', {
        duration: 3000
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('Success');
        console.log(data);

        //login user local
        this.loginService.loginUser(data.token);

        //get the user details
        this.loginService.getCurrentUser().subscribe(
          (user: any) => {
            this.loginService.setUser(user);
            console.log(user);
            if (this.loginService.getUserRole() == 'ADMIN') {
              // Navigate to admin dashboard
              // window.location.href = '/admin';
              this.router.navigate(['admin']);
              this.loginService.loginStatus.next(true);
            } else if (this.loginService.getUserRole() == 'ROLE_USER') {
              // Navigate to user dashboard
              this.router.navigate(['user-dashboard/0']);
              this.loginService.loginStatus.next(true);
            }
          },
          (error) => {
            console.log('error');
            console.log(error);

          }
        );
      },
      (error) => {
        console.log('error');
        console.log(error);
        this.matSnackBar.open('Invalid Details , Try Again !!', '', {
          duration: 3000
        });
      }
    );
  }
}