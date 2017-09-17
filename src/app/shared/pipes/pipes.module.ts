import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslationPipe} from "./translation/translation.pipe";
import {LanguageService} from "../../language.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ TranslationPipe ],
  exports: [ TranslationPipe ],
  providers: [ LanguageService ]
})
export class PipesModule { }
