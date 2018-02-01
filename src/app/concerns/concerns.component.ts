import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-concerns',
  templateUrl: './concerns.component.html',
  styleUrls: ['./concerns.component.scss']
})
export class ConcernsComponent implements OnInit {
  @Input() id:      string;
  @Input() subject: string;
  @Input() body:    string;
  @Input() status:  number;
  card$: Observable<firebase.User>;

  constructor(private db: UsersService ) {
   }

  ngOnInit() {
    const path: string = 'users/' + this.id;
    this.card$ = this.db.getUser(path).valueChanges();
    // this.card$.subscribe();
  }

}
