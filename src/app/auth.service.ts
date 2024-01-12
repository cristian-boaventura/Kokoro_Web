import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor() {
    this.isLoggedIn = localStorage.getItem('token') ? true : false;

    window.addEventListener('storage', (event) => {
      if (event.key === 'token') {
        this.isLoggedIn = event.newValue ? true : false;
      }
    });
  }
}
