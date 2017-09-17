import {Component, OnDestroy, OnInit} from '@angular/core';
import {WorkWithImages} from "../../shared/classes/work-with-images";
import {StoreService} from "../../store.service";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {HttpService} from "../../http.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SharedService} from "../../shared-service";

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit, OnDestroy {
  bgResult: string;
  messageState$: Subscription;
  messageStateName: string;
  messageStateAction: string;
  messageImage: string;

  messageBody = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    author: new FormControl(''),
    category: new FormControl(''),
    date: new FormControl(''),
    store: new FormControl(''),
    images: new FormControl('', Validators.required),
    _id: new FormControl(''),
  });

  constructor(private store: StoreService, private service: HttpService) {
  }

  ngOnInit() {
    this.messageState$ = this.store.obsMessageAction$().withLatestFrom(this.store.obsMessageStateName$())
        .subscribe(messageState => {
          this.messageStateAction = messageState[0];
          this.messageStateName = messageState[1];
          this.getMessage(this.messageStateAction);
        });
  }

  getMessage(messageStateAction) {
    this.messageBody.reset();
    if (messageStateAction == 'put') {
      const subscription = this.store.obsMessageId().subscribe(id => {
        this.service.getMessageById(this.messageStateName, id).subscribe(messageBody => {
          this.messageBody.patchValue(messageBody);
          if (messageBody.images.length) {
            this.service.getImage(messageBody.images[0].id).subscribe(img => {
                this.messageImage = img;
                this.setImageIntoMessage(img);
                subscription.unsubscribe();
            });
          }
        });
      });
    }
  }

  upLoadBackground(readerEvt, iconOrBg) {
    WorkWithImages.upLoadBackground((result, iconOrBg) => this.setPicture(result, iconOrBg), readerEvt, iconOrBg);
  }

  setPicture(result, iconOrBg) {
    this.setImageIntoMessage(result);
    this[iconOrBg] = result;
  }

  setImageIntoMessage(img) {
    const image = [{
        image: img
    }];
    this.messageBody.patchValue({images: image});
  }

  buttonAccept() {
    if (this.messageStateAction == 'put') {
      this.service.putMessage(this.messageStateName, this.messageBody).subscribe(() => {
        this.store.nextRefreshMessages();
      });
    } else if (this.messageStateAction == 'post') {
      this.messageBody.patchValue({category: this.messageStateName, date: new Date()});
      this.service.postMessage(this.messageBody).subscribe(() => {
        this.store.nextRefreshMessages()
      });
    }
  }

  ngOnDestroy(): void {
    this.messageState$.unsubscribe();
  }
}
