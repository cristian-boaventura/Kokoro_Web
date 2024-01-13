import { Component } from '@angular/core';
import { signout } from '../../utils/firebase.utils';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { setStore } from '../../utils/firebase.utils';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-account.component.html',
})
export class DeleteAccountComponent {
  reason = '';
  password = '';
  isLoading = false;

  async handleSubmit(e: any) {
    const form = e.target;
    form.reportValidity();
    if (form.checkValidity()) {
      this.isLoading = true;
      this.isLoading = false;
    }
  }

  constructor(private router: Router) {
    this.router = router;
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
