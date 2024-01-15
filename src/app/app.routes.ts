import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { authGuard, loginGuard } from './auth.guard';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PrivacyPoliciesComponent } from './privacy-policies/privacy-policies.component';

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
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  {
    path: 'privacy-policies',
    component: PrivacyPoliciesComponent,
  },
  { path: '**', redirectTo: '' },
];
