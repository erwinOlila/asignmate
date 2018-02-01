import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersService } from './users.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  authState$: Observable<firebase.User>;
  currentUser: firebase.User;
  isLoggedIn: boolean;
  isVerified: boolean;
  sentVerify: boolean;
  is_error:   boolean;
  error:      string;

  constructor(public afAuth: AngularFireAuth, private router: Router, private db: UsersService) {
    this.sentVerify = false;
    this.is_error = false;
    console.log('Auth service triggered');
    this.authState$ = afAuth.authState;
    // This gets triggered when user value changes
    this.authState$.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.currentUser = user;
        if (this.currentUser.emailVerified) {
          this.isVerified = true;
          this.router.navigate(['/profile']);
          this.db.afDb.object('users/' + user.uid).update({
            online: true
          });
        } else {
          this.isVerified = false;
          this.is_error = true;
          setTimeout(() => {
            this.is_error = false;
          }, 3000);
        }
      } else {
        this.currentUser = null;
        this.isLoggedIn = false;
      }
    });
  }

  getAuthState = (): Observable<firebase.User> => {
    return this.authState$;
  }

  getStatus = (): Observable<boolean> => {
    return Observable.of(this.isLoggedIn);
  }

  emailLogin = (email: string, password: string) => {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      if (user !== null) {
        this.currentUser = user;
      }
    }).catch(err => {
      if (err) {
        this.is_error = true;
        this.error = err.message;
        setTimeout(() => {
          this.is_error = false;
        }, 3000);
      }
    });
  }

  tryVerify = (): void => {
    this.sentVerify = true;
    this.is_error = true;
    console.log('VERIFICATION CLICKED');
  }

  verify = (): void => {
    this.sentVerify = true;
    this.authState$.subscribe(user => {
      if (!user.emailVerified) {
        user.sendEmailVerification().then(() => {
          console.log('email sent');
        }).catch(err => {
          console.log(err);
        });
      }
    });
  }

  logOut = (): void => {
    this.db.afDb.object('users/' + this.currentUser.uid).update({
      online: false
    });
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}
