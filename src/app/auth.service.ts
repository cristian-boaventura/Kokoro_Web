import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { signout } from '../utils/firebase.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {
    this.isLoggedIn = localStorage.getItem('token') ? true : false;

    window.addEventListener('storage', (event) => {
      if (event.key === 'token') {
        this.isLoggedIn = event.newValue ? true : false;
      }
    });
  }

  goToHome() {
    this.router.navigate(['login-to-delete-account']);
  }

  async signout() {
    try {
      await signout();
    } catch (error) {
      console.error(error);
    } finally {
      this.goToHome();
    }
  }
}
