import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SharedService} from "../shared-service";
import {HttpService} from "../http.service";

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.css']
})
export class ShopInfoComponent implements OnInit {
  submitBool: boolean;
  form = new FormGroup({
    address: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    description: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    sharetext: new FormControl('', Validators.required),
    uri: new FormControl(''),
    zip: new FormControl(''),
    _id: new FormControl(''),
  });

  constructor(private service: HttpService) {
    this.form.valueChanges.subscribe(() => this.submitBool = SharedService.checkForm(this.form))
  }

  ngOnInit() {
    this.service.getShop().subscribe(res => this.form.patchValue(res[0]));
  }

  onFormSubmit() {
    this.service.putShop(this.form).subscribe();
  }

}
