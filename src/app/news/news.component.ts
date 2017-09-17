import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../http.service";
import {Observable} from "rxjs/Observable";
import {StoreService} from "../store.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit, OnDestroy {
  storeSub$: Subscription;
  message$: Observable<Message[]>;
  messageName: string;

  constructor(private service: HttpService, private store: StoreService) {
    this.messageName = 'Новости';
  }

  ngOnInit() {
    this.message$ = this.service.getMessage(this.messageName);
    this.storeSub$ = this.store.obsRefreshMessages().subscribe(() => this.message$ = this.service.getMessage(this.messageName));
  }

  ngOnDestroy() {
    this.storeSub$.unsubscribe();
  }
}
