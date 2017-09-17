import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
  private isUserLoggedIn;
  private username;
  private password;

  constructor() {
    this.isUserLoggedIn = false;
  }

  setUserUsername(username) {
    if(username) {
      this.setUserLoggedIn();
    }
    this.username = username;
  }

  setUserLoginAndPassword(username, password) {
    if (username && password) {
      this.setUserLoggedIn();
    }
    this.username = username;
    this.password = password;
  }

  getUserUsername() {
    return this.username;
  }

  getLoginAndPassword() {
    return {login: this.username, password: this.password};
  }

  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }

}
