import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
          window.localStorage.setItem(
            'authDetail',
            JSON.stringify({ user: usr, expiresIn: loggedInUser.expiresIn })
          );
          this.autoLogout(loggedInUser);
          this.user.next(loggedInUser);
        }),
        catchError(this.handleError)
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
      .pipe(catchError(this.handleError));
  }

  handleError = (respError: HttpErrorResponse) => {
    let errorMessage = 'An Error Occured !!!';
    if (respError.error && respError.error.error) {
      console.log(respError.error);
      switch (respError.error.error.message) {
        case 'EMAIL_NOT_FOUND':
          errorMessage = `You are not a registered user`;
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'User Name / Password are not matching';
          break;
        case 'USER_DISABLED':
          errorMessage = 'User is disabled';
          break;
        case 'EMAIL_EXISTS':
          errorMessage = 'User with same email address is already present';
          break;
      }
    }
    this.error.next(errorMessage);
    return throwError(errorMessage);
  };

  logout() {
    this.user.next(null);
    window.localStorage.removeItem('authDetail');
  }

  autoLogin() {
    const usr = JSON.parse(window.localStorage.getItem('authDetail'));
    if (usr) {
      const loggedInUser = new User(usr.user, new Date(usr.expiresIn));
      if (loggedInUser && loggedInUser.token) {
        this.autoLogout(loggedInUser);
        this.user.next(loggedInUser);
      }
    }
  }

  autoLogout(loggedInUser: User) {
    setTimeout(() => {
      this.logout();
    }, loggedInUser.expiresIn.getTime() - new Date().getTime());
  }
}
