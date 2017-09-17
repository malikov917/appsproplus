import {Component, Input} from '@angular/core';
import {StoreService} from "../../../store.service";

@Component({
  selector: 'add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent {
  @Input() message: string;
  constructor(private store: StoreService) { }

  setOptions() {
    this.store.nextMessageStateName$(this.message);
    this.store.nextMessageAction$('post');
  }

}
