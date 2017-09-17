import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnChanges {
  @Input() layoutArray: string;
  @Input() layoutNames: string;
  @Input() formField: string;
  @Input() title: string;
  @Input() form: FormGroup;
  @Output() formChange = new EventEmitter();
  layoutSrc;
  layoutAcceptedNum = 0;
  constructor() { }

  ngOnChanges() {
      this.form.valueChanges.subscribe(value => {
          this.layoutAcceptedNum = value[this.formField];
          this.layoutSrc = this.layoutArray[value[this.formField]];
      })
  }

  design(layoutSrc, index, clicked?) {
      if (clicked) {
          this.layoutAcceptedNum = index;
          this.formChange.emit(this.formField);
          this.form.value[this.formField] = index;
      }
      this.layoutSrc = layoutSrc;
  };
}
