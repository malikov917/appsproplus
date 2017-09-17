import {Component, OnInit} from '@angular/core';
import {WorkWithImages} from "../../shared/classes/work-with-images";
import {NoImageBase64} from "../../shared/base64images/noimage.base64";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../http.service";
import {StoreService} from "../../store.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.css']
})
export class ProductsModalComponent implements OnInit {
  categories$: Observable<any>;
  bgResult: string;
  nophoto: string = NoImageBase64.noimage;
  options: number[];

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl('', Validators.required),
    product_options: new FormControl(''),
    images: new FormControl('', Validators.required),
  });

  constructor(private store: StoreService, private service: HttpService) {
    this.options = [];
  }

  ngOnInit() {
  }

  getCategories() {
    this.categories$ = this.service.getCategories();
  }

  upLoadBackground(readerEvt, iconOrBg) {
    WorkWithImages.upLoadBackground((result, iconOrBg) => this.setPicture(result, iconOrBg), readerEvt, iconOrBg);

  }

  addOption() {
    this.options.push(this.options.length + 1);
  }

  deleteOption(index) {
    this.options.splice(index, 1);
  }

  setPicture(result, iconOrBg) {
    this[iconOrBg] = result;
    this.setImageIntoProduct(result);
  }

  setImageIntoProduct(img) {
    const image = [{
      image: img
    }];
    this.form.patchValue({images: image});
  }

  buttonAccept() {
    this.service.postProduct(this.form).subscribe(() => {
      this.store.nextRefresh$();
    });
  }

}
