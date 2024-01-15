import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { authGuard, loginGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login-to-delete-account',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'delete-account',
    component: DeleteAccountComponent,
    canActivate: [authGuard],
  },
];
