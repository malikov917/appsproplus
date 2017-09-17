/**
 * Created by kmalikov on 20.7.17.
 */
export class WorkWithImages {
    constructor(){}

    public static upLoadBackground(callback, readerEvt, iconOrBg) {
        let file = readerEvt.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            callback(reader.result, iconOrBg);
        };
        reader.onerror = function (error) {
        };
    }
}