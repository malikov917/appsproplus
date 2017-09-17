import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class LanguageService {
  language : BehaviorSubject<string> = new BehaviorSubject<string>('ru');
  constructor() { }

}
