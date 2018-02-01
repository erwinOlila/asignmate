import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Injectable()
export class UsersService {
  user$: AngularFireObject<firebase.User>;
  users_list$: AngularFireList<any[]>;

  constructor(public afDb: AngularFireDatabase) {

   }

  getUser = (path: string): AngularFireObject<firebase.User> => {
    return this.afDb.object<firebase.User>(path);
  }

  getUserList = (path: string): AngularFireList<any> => {
    return this.afDb.list<any>(path);
  }

}
