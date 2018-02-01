import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.scss']
})
export class MyDialogComponent implements OnInit {
  ticket: FormGroup;

  constructor(public thisDialogRef: MatDialogRef<MyDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any, private auth: AuthService, private db: UsersService) {
      this.ticket = new FormGroup({
        subject: new FormControl(),
        body:    new FormControl()
      });
     }

  ngOnInit() {
  }

  onCloseConfirm = (): void => {
    if (this.ticket.value.subject && this.ticket.value.body) {
      const key = this.db.afDb.database.ref().child('concerns').push().key;
      this.db.afDb.object('concerns/' + key).update({
        subject:  this.ticket.value.subject,
        body:     this.ticket.value.body,
        date:     this.data.date,
        sender:   this.data.sender,
        receiver: this.data.receiver,
        status: 0
      });

      const obj: Object = {};
      obj[key] = true;

      this.db.afDb.object('users/' + this.data.sender + '/submits')
      .update(obj);

      this.db.afDb.object('users/' + this.data.receiver + '/receives')
      .update(obj);

      this.thisDialogRef.close('Confirm');
    }

  }

  onCloseCancel = (): void => {
    this.thisDialogRef.close('Cancel');
  }

}
