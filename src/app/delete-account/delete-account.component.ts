import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { setStore } from '../../utils/firebase.utils';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ModalComponent } from '../modal/modal.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [FormsModule, SpinnerComponent, ModalComponent],
  templateUrl: './delete-account.component.html',
})
export class DeleteAccountComponent {
  reason = '';
  password = '';
  showModal = false;
  isLoading = false;
  isError = false;
  errorMessage = '';
  successMessage =
    'Hemos recibido tu solicitud de baja. La operación puede tardar más de un día en verse reflejada.';

  constructor(private authService: AuthService) {}

  goToHome() {
    this.authService.goToHome();
  }
  signout = this.authService.signout;

  async handleSubmit(e: any) {
    const form = e.target;
    form.reportValidity();
    if (form.checkValidity()) {
      this.isLoading = true;
      this.showModal = true;
      try {
        // throw new Error('Error de prueba');
        await setStore(this.reason);
        setTimeout(async () => {
          // await signout();
        }, 5000);
      } catch (error: any) {
        console.error(error);
        this.errorMessage = error.message;
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    }
  }
}
