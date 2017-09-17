import { Pipe, PipeTransform } from '@angular/core';
import {LanguageService} from "../../../language.service";
import {ru, en} from "../../../key-word-translate";

@Pipe({
  name: 'translation',
  pure: false
})
export class TranslationPipe implements PipeTransform {
  result: string;
  constructor (private languageService: LanguageService) {}

  transform(value: any, args?: any): any {
    this.languageService.language.subscribe(language => {
      this.result = language
    });

    try {
      switch (this.result) {
        case 'ru' : {
          this.result = ru.find(obj => obj.key == value).value;
          break;
        }
        case 'en' : {
          this.result = en.find(obj => obj.key == value).value;
          break;
        }
      }
      return this.result;
    } catch(e){}

  }

}
