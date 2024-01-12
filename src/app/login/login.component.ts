declare const google: any;

import { Component, OnInit } from '@angular/core';
import {
  handleCredentialResponse,
  signinWithEmail,
} from '../../utils/firebase.utils';
import { validateUser } from '../../utils/validateUser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, SpinnerComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {
    this.router = router;
  }

  goToHome() {
    this.router.navigate(['delete-account']);
  }

  email = '';
  password = '';
  isLoading = false;

  async handleSubmit(e: any) {
    const form = e.target;
    form.reportValidity();

    if (form.checkValidity()) {
      this.isLoading = true;
      await signinWithEmail(this.email, this.password);
      this.goToHome();
      this.isLoading = false;
    }
  }

  ngOnInit() {
    google.accounts.id.initialize({
      client_id:
        '138954647249-vhta7kr648j3888rckn4ngak1apu4l0d.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp),
    });

    google.accounts.id.renderButton(
      document.getElementById('googleSignIn'),
      {
        type: 'standard',
        shape: 'pill',
        theme: 'outline',
        text: 'signin_with',
        size: 'medium',
      } // customization attributes
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  async handleLogin(response: any) {
    try {
      // decode the token
      const google_uid = await this.decodeToken(response.credential).sub;
      // validate user
      const userExists = await validateUser(google_uid);
      // handle valid user
      if (userExists) {
        await handleCredentialResponse(response);
        this.goToHome();
      } else {
        // handle invalid user
        alert('Error: Usuario no registrado');
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
