import { LightningElement, api } from 'lwc';

export default class ContextBarItem extends LightningElement {
    @api menuTitle;

    @api location;

    @api
    get selectedLocation() {
        return this._selectedLocation;
    }
    set selectedLocation(value) {
        this._selectedLocation = value;
        if (this.isRendered) {
            this.isActive = this.location == value;
        }
    }
    _selectedLocation;
        
    @api
    get utilityIconName() {
        return this._utilityIconName;
    }
    set utilityIconName(value) {
        this._utilityIconName = value;
        this.iconName = "utility:" + value;
        let title = value.replace(/_([a-z])/g, (match, p1) => ` ${p1.toUpperCase()}`);
        title = title.charAt(0).toUpperCase() + title.slice(1);
        this.iconTitle = title;
    }
    _utilityIconName = "";

    iconName;
    iconTitle;

    isRendered = false;

    className = "slds-context-bar__item";

    get isActive() {
        return this._isActive;
    }
    set isActive(value) {
        this._isActive = value;
        const classList = this.template.querySelector("li.slds-context-bar__item").classList;
        if (this.isActive && !classList.contains("slds-is-active")) {
            classList.add("slds-is-active");
        } else if (!this.isActive && classList.contains("slds-is-active")) {
            classList.remove("slds-is-active");
        }
        this.className = classList.toString();
    }
    _isActive = false;

    renderedCallback() {
        this.isRendered = true;
        // タブの選択状態を最新化
        this.selectedLocation = this.selectedLocation;
    }

    handleClick() {
        const event = new CustomEvent('itemclick');
        // Fire the event
        this.dispatchEvent(event);
    }
}