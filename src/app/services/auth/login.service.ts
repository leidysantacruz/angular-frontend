import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginRequest } from './loginRequest';
import { RegisterRequest } from './registerRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserLoginOn = new BehaviorSubject<boolean>(this.isLoggedIn());
  private currentUserData = new BehaviorSubject<string>(this.getToken());

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(`${environment.urlHost}auth/login`, credentials).pipe(
      tap(userData => {
        sessionStorage.setItem('token', userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    );
  }

  register(credentials: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${environment.urlHost}auth/register`, credentials).pipe(
      tap(() => console.info('User registered successfully')),
      catchError(this.handleError)
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.currentUserData.next('');
    this.currentUserLoginOn.next(false);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userData(): Observable<string> {
    return this.currentUserData.asObservable();
  }

  get userToken(): string {
    return this.currentUserData.value;
  }

  private isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  private getToken(): string {
    return sessionStorage.getItem('token') || '';
  }
}
