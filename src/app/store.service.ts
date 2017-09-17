import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class StoreService {
  private messageStateName$ = new Subject();
  private messageAction$ = new Subject();
  private messageId$ = new Subject();
  private refreshMessages = new Subject();
  private refreshCategories$ = new Subject();
  private refresh$ = new Subject();

  obsMessageStateName$(): Observable<string> {
    return this.messageStateName$.asObservable();
  }

  obsMessageAction$(): Observable<string> {
    return this.messageAction$.asObservable();
  }

  obsMessageId(): Observable<string> {
    return this.messageId$.asObservable();
  }

  obsRefreshMessages(): Observable<string> {
    return this.refreshMessages.asObservable();
  }

  obsRefreshCategories$(): Observable<string> {
    return this.refreshCategories$.asObservable();
  }

  obsRefresh$(): Observable<string> {
    return this.refresh$.asObservable();
  }

  nextMessageStateName$(name: string) {
    this.messageStateName$.next(name);
  }

  nextMessageAction$(action: string) {
    this.messageAction$.next(action);
  }

  nextMessageId(id) {
    this.messageId$.next(id);
  }

  nextRefreshMessages() {
    this.refreshMessages.next();
  }

  nextRefreshCategories$() {
    this.refreshCategories$.next();
  }

  nextRefresh$() {
    this.refresh$.next();
  }


}
