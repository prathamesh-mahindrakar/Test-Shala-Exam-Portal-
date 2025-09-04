import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatCardModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {

  constructor(private userservice: UserService, private snackbar: MatSnackBar) { }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  ngOnInit() { }

  formSubmit() {
    console.log(this.user);

    if (this.user.username == '' || this.user.username == null) {
      this.snackbar.open("User is required", "", {
        duration: 3000
      });
      return;
    }

    this.userservice.addUser(this.user).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user);
        Swal.fire('Success!', 'User Id is ' + data.id, 'success');
      },
      (error) => {
        this.snackbar.open("Username is Already Exists", "", {
          duration: 3000
        });
      }
    );
  }
}
