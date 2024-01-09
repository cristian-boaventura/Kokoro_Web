declare const google: any;

import { Component, OnInit } from '@angular/core';
import {
  handleCredentialResponse,
} from '../../utils/firebase.utils';
import { validateUser } from '../../utils/validateUser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
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
        handleCredentialResponse(response);
      } else {
        // handle invalid user
        console.log('User is not registered');
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
