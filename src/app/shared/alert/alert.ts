import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-alert',
  imports: [TranslatePipe],
  templateUrl: './alert.html',
  styleUrl: './alert.scss'
})
export class Alert {

  title : string = "";
  message : string = '';
  type : "error" | "success" | "info" = "info";
  show : boolean = false;
  closable : boolean = false;
  confirmation : boolean = false;
  delai : number = 3000;
  onConfirm? : () => void
  
  showAlert (title : string, message : string, type : "error" | "success" | "info" , closable : boolean, confirmation : boolean, delai : number, onConfirm? : () => void) {
    this.title = title;
    this.message = message;
    this.type = type;
    this.closable = closable;
    this.confirmation = confirmation;
    this.delai = delai;
    this.show = true;
    this.onConfirm = onConfirm;

    if (this.delai > 0) {
      setTimeout(() => {
        this.show = false;
      }, delai);
    }
  }

  confirm () {
    if (this.onConfirm) this.onConfirm();
    this.show = false;
  }

  close () {
    this.show = false;
  }
}
