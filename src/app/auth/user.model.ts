import { AuthResponse } from './auth.service';

export class User {
  private _token: string;
  private _refreshToken: string;
  private _email: string;
  private _displayName: string;
  private _expiresIn: Date;
  constructor(user: AuthResponse) {
    this._token = user.idToken;
    this._displayName = user.displayName;
    this._email = user.email;
    this._refreshToken = user.refreshToken;
    const currDate = new Date();
    this._expiresIn = new Date(currDate.setSeconds(user.expiresIn));
  }

  get token(): string {
    if (this._expiresIn < new Date()) {
      return this._token;
    }
    return null;
  }
  get email(): string {
    if (this._expiresIn < new Date()) {
      return this._email;
    }
    return null;
  }
  get displayName(): string {
    if (this._expiresIn < new Date()) {
      return this._displayName;
    }
    return null;
  }
  get refreshToken(): string {
    if (this._expiresIn < new Date()) {
      return this._refreshToken;
    }
    return null;
  }
}
