import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/auth/login.service';
import { UserService } from '../services/user/user.service';
import { User } from '../services/auth/user'; // Verifica la ruta

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  isLoading: boolean = true;

  constructor(
    private loginService: LoginService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const token = this.loginService.userToken;

    if (token) {
      const userId = 355; // Cambia esto por el ID real del usuario si es necesario

      this.userService.getUser(userId).subscribe(
        userData => {
          this.user = userData;
          this.isLoading = false;
        },
        error => {
          console.error('Error loading user data:', error);
          this.isLoading = false;
        }
      );
    } else {
      this.isLoading = false;
    }
  }

  logout(): void {
    this.loginService.logout();
  }
}
