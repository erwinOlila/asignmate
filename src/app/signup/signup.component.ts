import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user_details: FormGroup;
  error: boolean;
  error_message: string;
  password_match_message: string;

  constructor(private router: Router, private auth: AuthService, private db: UsersService) {
    this.user_details = new FormGroup({
      first:         new FormControl(),
      last:          new FormControl(),
      email:         new FormControl(),
      password:      new FormControl(),
      password_conf: new FormControl(),
      birth:         new FormControl(),
      address:       new FormControl(),
      profession:    new FormControl()
    });
    this.auth.authState$.subscribe(user => {
      if (user !== null) {
        if (user.displayName === null) {
          user.updateProfile({
            displayName: this.user_details.value.first + ' ' + this.user_details.value.last,
            photoURL: 'https://placeimg.com/400/400/animals'
          }).then(() => {
            this.db.afDb.object('users/' + user.uid).set({
              id: user.uid,
              displayName: user.displayName,
              subName: user.displayName.toLowerCase(),
              photoURL:    user.photoURL,
              address:     this.user_details.value.address,
              email:       user.email,
              join:        user.metadata.creationTime,
              profession:  this.user_details.value.profession,
              online: true,
              respects: 0
            });
          }).catch(err => {
            if (err) {
              this.error = true;
              this.error_message = err.message;
            }
          });
        }
      }
    });
   }

  ngOnInit() {
    const button = <HTMLButtonElement>document.getElementById('button');
    button.disabled = true;
  }

  checkForm = (): void => {
    const button = <HTMLButtonElement>document.getElementById('button');
    const user = this.user_details.value;
    if (user.first === null || user.last === null || user.email === null ||
      user.password === null || user.password_conf === null || user.birth === null) {
        button.disabled = true;
    } else if (user.first.length === 0 || user.last.length === 0 || user.email.length === 0 ||
      user.password.length === 0 || user.password_conf.length === 0 || user.birth.length === 0) {
        button.disabled = true;
    } else if (this.user_details.value.password !== this.user_details.value.password_conf) {
      // tslint:disable-next-line:quotemark
      this.password_match_message = "passwords don't match";
      button.disabled = true;
    } else {
      button.disabled = false;
      this.password_match_message = null;
    }
  }

  // confirm = (): void => {
  //   const button = <HTMLButtonElement>document.getElementById('button');
  //   if (this.user_details.value.password !== this.user_details.value.password_conf) {
  //     // tslint:disable-next-line:quotemark
  //     this.password_match_message = "passwords don't match";
  //     button.disabled = true;
  //   } else {
  //     button.disabled = false;
  //     this.password_match_message = null;
  //   }
  // }

  onSubmit = (): void => {
    const email:    string = this.user_details.value.email;
    const password: string = this.user_details.value.password;

    this.auth.afAuth.auth.createUserWithEmailAndPassword(email, password).then(authData => {
      this.router.navigate(['/profile']);
    }).catch(err => {
      const errCode = err.code;
      const errMsg = err.message;

      if (err) {
        this.error = true;
        this.error_message = err.message;
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    });
  }

}
