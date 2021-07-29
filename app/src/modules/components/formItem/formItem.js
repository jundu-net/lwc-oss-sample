import { LightningElement, api } from 'lwc';

export default class FormItem extends LightningElement {
    @api label;

    @api type;

    @api value;

    @api isEditable = false;

    get classSet() {
        let classSet = 'slds-form-element slds-form-element_horizontal';
        if (!this.isEditable) {
            classSet += ' slds-form-element_readonly';
        }
        return classSet;
    }
}