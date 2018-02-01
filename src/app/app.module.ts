import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule} from '@angular/forms';

import { MaterialModule } from './material/material.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { SignupComponent } from './signup/signup.component';
import { AgentCardsComponent } from './agent-cards/agent-cards.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { ConcernsComponent } from './concerns/concerns.component';
import { LoginGuard } from './login.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    EmailVerifyComponent,
    SignupComponent,
    AgentCardsComponent,
    MyDialogComponent,
    ConcernsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.config),
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard, UsersService, LoginGuard],
  bootstrap: [AppComponent],
  entryComponents: [MyDialogComponent]
})
export class AppModule { }
