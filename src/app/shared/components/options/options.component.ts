import {Component, Input} from '@angular/core';
import {StoreService} from "../../../store.service";
import {HttpService} from "../../../http.service";

@Component({
  selector: 'options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {
  @Input() message: string;
  @Input() id: string;
  @Input() type: string;
  constructor(private store: StoreService, private service: HttpService) { }

  setOptions() {
    this.store.nextMessageStateName$(this.message);
    this.store.nextMessageAction$('put');
    this.store.nextMessageId(this.id)
  }

  remove() {
    if (this.type == 'products') {
      this.service.deleteProduct(this.id).subscribe(() => {
        this.store.nextRefresh$()
      });
    } else {
      this.service.deleteMessage(this.id).subscribe(() => {
        this.store.nextRefreshMessages()
      });
    }
  }

}
