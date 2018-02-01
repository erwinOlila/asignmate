import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

@Component({
  selector: 'app-agent-cards',
  templateUrl: './agent-cards.component.html',
  styleUrls: ['./agent-cards.component.scss']
})
export class AgentCardsComponent implements OnInit {
  @Input() user_id:    string;
  @Input() name:       string;
  @Input() photo:      string;
  @Input() email:      string;
  @Input() online:     string;
  @Input() profession: string;
  @Input() id:         string; //agent's if
  @Input() respects:   number;
  dialogResult:        string;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  open_dialog = (): void => {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '600px',
      data: {
        name:     this.name,
        sender:   this.user_id,
        receiver: this.id,
        date:     Math.floor(Date.now())
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
     this.dialogResult = result;
    });
  }
}
