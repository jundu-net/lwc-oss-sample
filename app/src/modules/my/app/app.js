import Navigo from 'navigo';
import { LightningElement } from 'lwc';

export default class App extends LightningElement {
    router = new Navigo('/', {
        noMatchWarning: true,
    });

    navItems = [
        {
            title: 'Home',
            location: '/home',
            icon: 'home'
        },
        {
            title: '入力フォーム',
            location: '/edit-form',
            icon: 'edit_form'
        }
    ];

    navSelectedItem;

    view;

    constructor() {
        super();
        this.router.on({
            '/home': async () => {
                const { default: Home } = await import('view/home');
                this.setView(Home);
            },
            '/edit-form': async () => {
                const { default: EditForm } = await import('view/editForm');
                this.setView(EditForm);
            }
        });
        const navigateToDefault = () => {
            this.router.navigate('/home');
        };

        this.router.notFound(navigateToDefault);
        this.router.on(navigateToDefault);
        this.router.resolve();

        if (this.navItems.length > 0) {
            this.navSelectedItem = this.navItems[0];
        }

        // ブラウザパスへ移動
        this.setSelectedItem(window.location.pathname);
    }

    setView(component, props = {}) {
        this.view = {
            component,
            props,
        };
    }

    setSelectedItem(location) {
        const item = this.navItems.find(item => item.location == location);
        if (item) {
            this.navSelectedItem = item;
        } else {
            // TODO 動的にタブを追加するためにRouterのデフォルト処理の見直し
            // const newItem = {
            //     title: 'tab',
            //     location: location
            // }
            // this.navItems.add(newItem);
            // this.navSelectedItem = newItem;
        }
    }

    handleNavigation(evt) {
        const location = evt.detail;
        if (this.navSelectedItem && this.navSelectedItem.location != location) {
            this.setSelectedItem(location);
            this.router.navigate(location);
        }
    }
}
