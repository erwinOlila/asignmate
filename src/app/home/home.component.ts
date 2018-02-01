import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: firebase.User;
  constructor(public auth: AuthService, private router: Router) {
    this.user = this.auth.currentUser;
   }

  ngOnInit() {

  }

}
