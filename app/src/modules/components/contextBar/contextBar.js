import { LightningElement, api } from 'lwc';

export default class ContextBar extends LightningElement {
    @api appName;

    @api appLauncerVisible = false;
    @api appLauncherDescription;

    navItems = [
        {
            title: 'Home',
            location: '/'
        },
        {
            title: '入力フォーム',
            location: '/input-form'
        }
    ];

    handleAppLauncherClick() {
        const event = new CustomEvent('applauncherclick', {
        });
        // Fire the event
        this.dispatchEvent(event);
    }
}