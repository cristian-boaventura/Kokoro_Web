declare const google: any;

import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import {
  handleGoogleCredential,
  signinWithEmail,
} from '../../utils/firebase.utils';
import { validateUser } from '../../utils/validateUser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, SpinnerComponent, ModalComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.router = router;
  }

  goToHome() {
    this.router.navigate(['delete-account']);
  }

  email = '';
  password = '';
  showModal = false;
  isLoading = false;
  isError = false;
  errorMessage = '';

  async handleSubmit(e: any) {
    const form = e.target;
    form.reportValidity();

    if (form.checkValidity()) {
      this.isLoading = true;
      this.showModal = true;
      try {
        await signinWithEmail(this.email, this.password);
        this.goToHome();
      } catch (error: any) {
        this.isError = true;
        if (error.code === 'auth/invalid-credential') {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        } else {
          this.errorMessage = error.message;
        }
        this.isLoading = false;
      } finally {
        this.cdr.detectChanges();
      }
    }
  }

  ngOnInit() {
    google.accounts.id.initialize({
      client_id:
        '138954647249-vhta7kr648j3888rckn4ngak1apu4l0d.apps.googleusercontent.com',
      callback: (resp: any) => this.handleGoogleLogin(resp),
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

  handleGoogleLogin = async (response: any) => {
    this.isLoading = true;
    this.showModal = true;
    this.cdr.detectChanges();
    try {
      // decode the token
      const google_uid = await this.decodeToken(response.credential).sub;
      // validate user
      const userExists = await validateUser(google_uid);
      // handle valid user
      if (userExists) {
        await handleGoogleCredential(response);
        this.ngZone.run(() => this.goToHome());
      } else {
        // handle invalid user
        throw new Error('Usuario no registrado');
      }
    } catch (error: any) {
      console.error(error);
      this.isError = true;
      this.errorMessage = error.message;
      this.isLoading = false;
    } finally {
      this.cdr.detectChanges();
    }
  };

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
