import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { RegisterRequest } from '../auth/registerRequest';
import { User } from '../auth/user'; // Importa User desde el archivo correcto
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.urlApi}user/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(userRequest: User): Observable<any> {
    return this.http.put(`${environment.urlApi}user`, userRequest).pipe(
      catchError(this.handleError)
    );
  }

  registerUser(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post(`${environment.urlHost}auth/register`, registerRequest).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error ', error.error);
    } else {
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }
}
