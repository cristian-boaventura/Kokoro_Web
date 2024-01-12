import { Component } from '@angular/core';
import { signout } from '../../utils/firebase.utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [],
  templateUrl: './delete-account.component.html',
})
export class DeleteAccountComponent {
  constructor(private router: Router) {
    this.router = router;
  }

  goToHome() {
    this.router.navigate(['login-to-delete-account']);
  }

  async signout() {
    await signout();
    this.goToHome();
  }
}
