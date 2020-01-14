import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponse {
  kind: string;
  idToken: string;
  displayName: string;
  email: string;
  refreshToken: string;
  expiresIn: number;
  localId: string;
}

@Injectable()
export class AuthService {
  error = new Subject<string>();
  user = new BehaviorSubject<User>(null);
  constructor(private httpClient: HttpClient) {}
  login(userName: string, password: string) {
    return this.httpClient
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDsfi2fqK_jIgVbkKjWwe-GdF4x9Y9imnQ',
        {
          email: userName,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        tap(usr => {
          const loggedInUser = new User(usr);
          console.log(loggedInUser);
          this.user.next(loggedInUser);
        }),
        catchError(respError => {
          let errorMessage = 'An Error Occured !!!';
          if (respError.error && respError.error.error) {
            console.log(respError.error);
            switch (respError.error.error.message) {
              case 'EMAIL_NOT_FOUND':
                errorMessage = `${userName} is not a registered user`;
                break;
              case 'INVALID_PASSWORD':
                errorMessage = 'User Name / Password are not matching';
                break;
              case 'USER_DISABLED':
                errorMessage = 'User is disabled';
                break;
            }
          }
          this.error.next(errorMessage);
          return throwError(errorMessage);
        })
      );
  }
  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDsfi2fqK_jIgVbkKjWwe-GdF4x9Y9imnQ',
        {
          displayName: `${firstName} ${lastName}`,
          email: email,
          password: password,
          returnSecureToken: false
        }
      )
      .pipe(
        catchError(respError => {
          let errorMessage = 'An Error Occured !!!';
          if (respError.error && respError.error.error) {
            console.log(respError.error);
            switch (respError.error.error.message) {
              case 'EMAIL_EXISTS':
                errorMessage = 'User with same email address is already present';
            }
          }
          this.error.next(errorMessage);
          return throwError(errorMessage);
        })
      );
  }
}
