import {Component, OnInit} from '@angular/core';
import {WorkWithImages} from '../shared/classes/work-with-images';
import {HttpService} from '../http.service';
import {FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.css']
})


export class ApplicationInfoComponent implements OnInit {
  hoveredBG: boolean;
  hoveredIcon: boolean;
  iconResult: string;
  bgResult: string;
  colorArray = ['assets/img/colors/AquaFinal.png', 'assets/img/colors/InLoveToadFinal.png', 'assets/img/colors/InternationalOrangeFinal.png', 'assets/img/colors/LightCherryFinal.png', 'assets/img/colors/PurpleGreyFinal.png'];
  templateArray = ['assets/img/design/FL_LOGOTYPE_ICONS.jpg', 'assets/img/design/LOGOTYPE_CATEGORIES.jpg', 'assets/img/design/LOGOTYPE_INFORMATION.jpg', 'assets/img/design/NEWS_CATEGORIES.jpg', 'assets/img/design/SALE_CATEGORIES.jpg'];
  iconArray = ['assets/img/icons/CLASSIC.png', 'assets/img/icons/LIGHT.png', 'assets/img/icons/MATERIAL.png'];
  colorNames = ['Аква', 'Влюбленная жаба', 'Международный оранжевый', 'Светлая вишня', 'Фиолетовый и серый'];
  templateNames = ['Вариант 1', 'Вариант 2', 'Вариант 3', 'Вариант 4', 'Вариант 5'];
  iconNames = ['Классические', 'Светлые', 'Современные'];
  public form = new FormGroup({
        backgroud: new FormControl(''),
        store: new FormControl(''),
        logo: new FormControl(''),
        currency: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        firstname: new FormControl('', Validators.required),
        _id: new FormControl(''),
        lastname: new FormControl('', Validators.required),
      iconpack: new FormControl(),
      layout: new FormControl(),
      colorscheme: new FormControl(),
        phone: new FormControl('', Validators.required),
        title: new FormControl('', Validators.required),
        menuitems: new FormArray([])
    });
  constructor(private service: HttpService, private fb: FormBuilder) {
  }

/*    initAddress() {
        return this.fb.control(
            ''
        );
    }

    addOption() {
        const control = <FormArray>this.form.controls['menuitems'];
        control.push(this.initAddress());
    }

    deleteOption(i: number) {
        const control = <FormArray>this.form.controls['menuitems'];
        control.removeAt(i);
    }*/

  ngOnInit() {
/*      this.form = this.fb.group({
          backgroud: [''],
          store: [''],
          logo: [''],
          currency: ['', [Validators.required]],
          email: ['', [Validators.required]],
          firstname: ['', [Validators.required]],
          lastname: ['', [Validators.required]],
          _id: [''],
          layout: [''],
          iconpack: [''],
          colorsheme: [''],
          phone: ['', [Validators.required]],
          title: ['', [Validators.required]],
          menuitems: this.fb.array([''])
      });*/

    this.service.getApp().map(res => res[0]).subscribe(res => {
      this.form.patchValue(res);
      for (const item of res.menuitems) {
        this.form.value.menuitems.push(item);
      }
    });
  }

  onFormSubmit() {
    this.service.putApp(this.form).subscribe();
  }

  upLoadBackground(readerEvt, iconOrBg) {
    WorkWithImages.upLoadBackground((result, iconOrBg) => this.setPicture(result, iconOrBg), readerEvt, iconOrBg);

  }

  setPicture(result, iconOrBg) {
    this[iconOrBg] = result;
    if (iconOrBg == 'bgResult') {
      this.form.value['backgroud'] = result;
    } else {
      this.form.value['logo'] = result;
    }
  }

  hovered(hovered, iconOrBg) {
    this[iconOrBg] = hovered;
  };

}
