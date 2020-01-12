import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  constructor(private httpClient: HttpClient) {}
  login(userName: string, password: string) {
    return this.httpClient.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDsfi2fqK_jIgVbkKjWwe-GdF4x9Y9imnQ',
      {
        email: userName,
        password: password,
        returnSecureToken: true
      }
    );
  }
  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDsfi2fqK_jIgVbkKjWwe-GdF4x9Y9imnQ',
      {
        displayName: `${firstName} ${lastName}`,
        email: email,
        password: password,
        returnSecureToken: false
      }
    );
  }
}
