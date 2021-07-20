import { LightningElement, api } from 'lwc';

export default class ContextBar extends LightningElement {
    @api appName;
    @api appLauncerVisible = false;
    @api appLauncherDescription;
    @api selectedLocation;

    @api
    get navItems() {
        return this._navItems;
    }
    set navItems(value) {
        this._navItems = value;
        // if (value.length > 0) {
        //     this.selectedLocation = value[0].location;
        // }
    }
    _navItems;

    handleAppLauncherClick() {
        const event = new CustomEvent('applauncherclick', {
        });
        // Fire the event
        this.dispatchEvent(event);
    }

    handleItemClick(evt) {
        this.selectedLocation = evt.target.location;
        const event = new CustomEvent('navclick');
        // Fire the event
        this.dispatchEvent(event);
    }
}