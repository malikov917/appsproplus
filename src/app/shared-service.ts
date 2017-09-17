import {Injectable} from "@angular/core";
/**
 * Created by Konstantin on 19.08.2017.
 */

@Injectable()
export class SharedService {
    constructor() { }

    /**
     * Возвращает false, если не все поля формы заполнены.
     * @param form
     * @returns {boolean}
     */
    static checkForm(form):boolean {
        return form.status == 'VALID';
    }

}
