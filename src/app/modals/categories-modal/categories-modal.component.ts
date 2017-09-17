import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../http.service";
import {StoreService} from "../../store.service";

@Component({
  selector: 'app-categories-modal',
  templateUrl: './categories-modal.component.html',
  styleUrls: ['./categories-modal.component.css']
})
export class CategoriesModalComponent implements OnInit {
  form = new FormGroup({
    category: new FormControl('', Validators.required),
    description: new FormControl(''),
  });
  constructor(private store: StoreService, private service: HttpService) {
  }

  ngOnInit() {

  }

  buttonAccept() {
    this.service.postCategory(this.form).subscribe(() => {
      this.store.nextRefreshCategories$();
    });
  }

}
