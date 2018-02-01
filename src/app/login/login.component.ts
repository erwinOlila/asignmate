import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login_details: FormGroup;
  user$: Observable<firebase.User>;
  currentUser: firebase.User = null;

  constructor(public auth: AuthService, private router: Router) {
    this.user$ = this.auth.authState$;
    this.login_details = new FormGroup({
      email:    new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
  }

  login =  (): void => {
    const email:    string = this.login_details.value.email;
    const password: string = this.login_details.value.password;
    this.auth.emailLogin(email, password);
  }

  redirect = (): void => {
    this.router.navigate(['/signup']);
  }

}
