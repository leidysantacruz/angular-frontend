import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      this.loginService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/iniciar-sesion']);
        },
        error: (err) => this.errorMessage = err.message
      });
    }
  }
}
