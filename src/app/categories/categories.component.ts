import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpService} from "../http.service";
import {StoreService} from "../store.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories$: Observable<any>;
  subCategories$: Subscription;
  constructor(private service: HttpService, private store: StoreService) { }

  ngOnInit() {
    this.categories$ = this.service.getCategories();
    this.subCategories$ = this.store.obsRefreshCategories$().subscribe(() => {
      this.categories$ = this.service.getCategories();
    })
  }

  ngOnDestroy(){
    this.subCategories$.unsubscribe();
  }

}
