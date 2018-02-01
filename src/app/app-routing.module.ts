import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { ProfileComponent } from '../app/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { HomeComponent } from '../app/home/home.component';
import { EmailVerifyComponent } from '../app/email-verify/email-verify.component';
import { SignupComponent } from './signup/signup.component';
import { LoginGuard } from './login.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component:   ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'verify',
    component: EmailVerifyComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
