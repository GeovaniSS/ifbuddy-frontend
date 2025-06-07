import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  private readonly KEY = '@ifbuddy:token';

  hasToken() {
    return !!this.getToken();
  }

  getToken() {
    return window.localStorage.getItem(this.KEY);
  }

  setToken(token: string) {
    localStorage.setItem(this.KEY, token);
  }

  removeToken() {
    localStorage.removeItem(this.KEY);
  }
}
