import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserSidebar } from '../user-sidebar/user-sidebar';

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterOutlet, UserSidebar],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css'
})
export class UserDashboard {

}
