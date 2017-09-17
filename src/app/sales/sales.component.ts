import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {HttpService} from "../http.service";
import {StoreService} from "../store.service";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit, OnDestroy {
  storeSub$: Subscription;
  message$: Observable<Message[]>;
  messageName: string;

  constructor(private service: HttpService, private store: StoreService) {
    this.messageName = 'Акции';
  }

  ngOnInit() {
    this.message$ = this.service.getMessage(this.messageName);
    this.storeSub$ = this.store.obsRefreshMessages().subscribe(() => this.message$ = this.service.getMessage(this.messageName));
  }

  ngOnDestroy() {
    this.storeSub$.unsubscribe();
  }
}
