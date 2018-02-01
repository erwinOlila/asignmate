import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UsersService } from '../users.service';
import { AngularFireObject, AngularFireList, AngularFireAction } from 'angularfire2/database';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user:         firebase.User;
  user_details: firebase.User;
  profile:      Observable<firebase.User>;
  agents:       FormGroup;
  name$:        Subject<string>;
  items$:       Observable<any[]>;
  concerns$:    Array<Observable<any>>;
  agent_list:   Array<firebase.User>;
  has_value:    boolean;

  constructor(private auth: AuthService, private db: UsersService) {
    this.concerns$ = [];
    this.has_value = null;
    this.agents = new FormGroup({
      agent: new FormControl()
    });
    this.name$ = new Subject<string>();
    this.items$ = this.name$.switchMap(name =>
      db.afDb.list('/users', ref =>
     ref.orderByChild('subName').
     limitToFirst(5)
     .startAt(name)
     .endAt(name + '\uf8ff')
      ).valueChanges()
    );
    this.items$.subscribe(query => {
      this.agent_list = query;
    });
   }

  ngOnInit() {
    if (this.auth.currentUser !== null) {
      console.log('LOGGED IN!!!');
      console.log(this.auth.currentUser);
      this.loadProfile();
    } else {
      console.log('LOGGED OUT');
      console.log(this.auth.currentUser);
    }
    this.getKeys('/receives');
  }

  loadProfile = (): void => {
    this.user = this.auth.currentUser;
    const path: string = 'users/' +  this.user.uid;
    this.profile = this.db.getUser(path).valueChanges();
    this.profile.subscribe(user => {
    this.user_details = user;
  });
  }

  logout = (): void => {
    this.auth.logOut();
  }

  show = (item): void => {
    if (item.target.value !== '') {
      this.has_value = true;
      this.name$.next((item.target.value).toLowerCase());
    } else {
      this.has_value = false;
    }
  }

  getKeys = (node: string): void => {
    this.concerns$ = [];
    console.log('getting keys ...');
    const id:   string = this.auth.currentUser.uid;
    const path: string = 'users/' + id + node;
    const keys: Observable<any[]> = this.db.getUserList(path).snapshotChanges();
    keys.subscribe(object => {
      return object.map(key => {
        return this.concerns$.push(this.getConcerns(key.key));
        // return (this.concerns$).push(this.db.afDb.list('concerns/' + key.key).valueChanges());
      });
    });
  }

  getConcerns = (key: string): Observable<any> => {
    console.log('HELLO');
    const concern: Observable<any> =  this.db.afDb.object('concerns/' + key).valueChanges();
    console.log(concern);
    return concern;
  }

  getSubmits = (): void => {
    console.log('Submits');
  }

  toggle = (event): void => {
    switch (event.index) {
      case 0:
      this.getKeys('/receives');
      break;

      case 1:
      this.getKeys('/submits');
      break;

    }
  }
}
