import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/auth/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = ''; // Asegúrate de que esta propiedad esté definida
  userLoginOn: boolean = false;
errorMessage: any;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.userLoginOn.subscribe((isLoggedIn) => {
      this.userLoginOn = isLoggedIn;
    });
  }

  logout(): void {
    this.loginService.logout();
    // Después de hacer logout, redirige al usuario al login
    window.location.href = '/iniciar-sesion'; 
  }
}
