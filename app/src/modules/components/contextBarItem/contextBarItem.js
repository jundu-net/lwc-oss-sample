import { LightningElement, api } from 'lwc';

export default class ContextBarItem extends LightningElement {
    @api menuTitle;

    @api location;

    className = "slds-context-bar__item";

    get isActive() {
        return this._isActive;
    }
    set isActive(value) {
        this._isActive = value;
        let classList = this.template.querySelector("li.slds-context-bar__item").classList;
        if (this.isActive && !classList.contains("slds-is-active")) {
            classList.add("slds-is-active");
        } else if (!this.isActive && classList.contains("slds-is-active")) {
            classList.remove("slds-is-active");
        }
        this.className = classList.toString();
    }
    _isActive = false;

    renderedCallback() {
        const location = window.location.pathname;
        this.isActive = this.location == location;
    }
}