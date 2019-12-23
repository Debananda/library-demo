import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export class AuthService {
  constructor() {}
  login(userName: string, password: string) {
    console.log(userName, password);
  }
  register(firstName: string, lastName: string, email: string, password: string) {
    console.log(firstName, lastName, email, password);
  }
}
