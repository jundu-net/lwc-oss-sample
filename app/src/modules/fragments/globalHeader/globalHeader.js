import { LightningElement, api } from 'lwc';

export default class GlobalHeader extends LightningElement {
    @api navItems;

    @api navSelectedItem;

    get selectedLocation() {
        if (this.navSelectedItem) {
            return this.navSelectedItem.location;
        } else {
            return undefined;
        }
    }

    handleNavClick(evt) {
        const event = new CustomEvent('navigation', {
            detail: evt.target.selectedLocation
        });
        // Fire the event
        this.dispatchEvent(event);
    }
}
