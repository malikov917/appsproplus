import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {HttpService} from "../http.service";
import {StoreService} from "../store.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$: Observable<any>;
  subProducts$: Subscription;
  constructor(private service: HttpService, private store: StoreService) { }

  ngOnInit() {
    this.products$ = this.service.getProducts();
    this.subProducts$ = this.store.obsRefresh$().subscribe(() => {
      this.products$ = this.service.getProducts();
    })
  }

  ngOnDestroy(): void {
    this.subProducts$.unsubscribe()
  }

}
