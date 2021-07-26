import { LightningElement, api } from 'lwc';

export default class FormSection extends LightningElement {
    @api title;

    @api isOpen = false;

    @api minimizeVertical = false;

    get sectionClassSet() {
        let classSet = "slds-section";
        if (!this.title || this.isOpen) {
            classSet += " slds-is-open";
        }
        if (this.minimizeVertical) {
            classSet += " slds-m-vertical_none";
        }
        return classSet;
    }

    get contentClassSet() {
        let classSet = "slds-section__content slds-p-horizontal_small";
        if (this.minimizeVertical) {
            classSet += " slds-p-top--none";
        }
        return classSet;
    }

    handleClick() {
        this.isOpen = !this.isOpen;
    }

}