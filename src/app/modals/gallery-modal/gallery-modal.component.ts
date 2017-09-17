import { Component, OnInit } from '@angular/core';
import {WorkWithImages} from "../../shared/classes/work-with-images";
import {NoImageBase64} from "../../shared/base64images/noimage.base64";

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.css']
})
export class GalleryModalComponent implements OnInit {
  bgResult: string;
  nophoto: string = NoImageBase64.noimage;
  constructor() { }

  ngOnInit() {
  }

  upLoadBackground(readerEvt, iconOrBg) {
    WorkWithImages.upLoadBackground((result, iconOrBg) => this.setPicture(result, iconOrBg), readerEvt, iconOrBg);
  }

  setPicture(result, iconOrBg) {
    this[iconOrBg] = result;
  }

}
