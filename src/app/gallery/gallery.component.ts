import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../http.service';
import {StoreService} from '../store.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {
    storeSub$: Subscription;
    message$: Observable<Message[]>;
    messageName: string;

    constructor(private service: HttpService, private store: StoreService) {
        this.messageName = 'Галерея';
    }

    ngOnInit() {
        this.message$ = this.service.getMessage(this.messageName);
        this.storeSub$ = this.store.obsRefreshMessages().subscribe(() => this.message$ = this.service.getMessage(this.messageName));
    }

    ngOnDestroy() {
        this.storeSub$.unsubscribe();
    }

}
