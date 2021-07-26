import { api, LightningElement } from 'lwc';
import templateUnknown from './templateUnknown.html';
import templateText from './templateText.html';
import templateRichText from './templateRichText.html';
import templateNumber from './templateNumber.html';
import templateCurrency from './templateCurrency.html';
import templateDate from './templateDate.html';
import templateDatetime from './templateDatetime.html';
import templateEmail from './templateEmail.html';
import templatePhone from './templatePhone.html';
import templateUrl from './templateUrl.html';

export default class ReadOnlyField extends LightningElement {

    @api
    type;

    @api
    value;

    render() {
        if (this.type == "text") {
            return templateText;
        } else if (this.type == "rich-text") {
            return templateRichText;
        } else if (this.type == "date") {
            return templateDate;
        } else if (this.type == "datetime") {
            return templateDatetime;
        } else if (this.type == "email") {
            return templateEmail;
        } else if (this.type == "phone") {
            return templatePhone;
        } else if (this.type == "url") {
            return templateUrl;
        } else if (this.type == "number") {
            return templateNumber;
        } else if (this.type == "currency") {
            return templateCurrency;
        } else {
            return templateUnknown;
        }
    }

}