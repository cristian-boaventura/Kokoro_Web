import {
  ApplicationRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [SpinnerComponent, CommonModule],
  template: `
    <div
      tabindex="-1"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-[100svw] md:inset-0 h-[100svh] bg-black bg-opacity-50 dark:bg-opacity-70 transition-all duration-300 ease-in-out"
    >
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="p-4 md:p-5 text-center">
            @if(isLoading) {<app-spinner />} @else if(isError) {
            <img src="assets/Warning_Icon.svg" class="mb-4 w-12 h-12 mx-auto" />
            <h3
              class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
            >
              Ha ocurrido el siguiente error:
              <span class="text-red-600 dark:text-red-400">
                "{{ errorMessage }}" </span
              >. Por favor, inténtalo de nuevo. Si el error persiste, contacta
              con nosotros en:
              <a
                href="mailto:consultas@appkokoro.com"
                class="dark:text-primary-600 text-primary-700 underline hover:text-primary-800 dark:hover:text-primary-700"
                >consultas&#64;appkokoro.com</a
              >.
            </h3>
            <button
              type="button"
              class="text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
              (click)="closeModal()"
            >
              Aceptar
            </button>
            } @else {
            <img src="assets/Check_Icon.svg" class="mb-4 w-12 h-12 mx-auto" />
            <h3
              class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
            >
              {{ successMessage }}
            </h3>
            <button
              type="button"
              class="text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
              (click)="signout()"
            >
              Aceptar
            </button>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ModalComponent {
  @Input() showModal: boolean = true;
  @Input() isLoading: boolean = false;
  @Input() isError: boolean = false;
  @Input() errorMessage: string = '';
  @Input() successMessage: string = '';
  @Output() showModalChange = new EventEmitter<boolean>();
  @Output() isLoadingChange = new EventEmitter<boolean>();
  @Output() isErrorChange = new EventEmitter<boolean>();
  @Output() errorMessageChange = new EventEmitter<string>();

  closeModal() {
    this.showModal = false;
    this.showModalChange.emit(this.showModal);
    this.appRef.tick();
  }

  constructor(
    private authService: AuthService,
    private appRef: ApplicationRef
  ) {}

  goToHome() {
    this.authService.goToHome();
  }
  signout = this.authService.signout;
}
