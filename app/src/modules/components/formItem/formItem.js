import { LightningElement, api } from 'lwc';

export default class FormItem extends LightningElement {
    @api label;

    @api type;

    @api value;
}