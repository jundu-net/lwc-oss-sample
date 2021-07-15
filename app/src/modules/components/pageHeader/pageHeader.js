import { LightningElement } from 'lwc';

export default class PageHeader extends LightningElement {

    PADDING = 12;

    shouldResizeHeader = false;
    shouldResetHeader = false;

    headerHeight;

    connectedCallback() {
        // スクロールイベントを登録
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    renderedCallback() {
        // ヘッダ部分の高さをダミー用に計算する
        const headerElement = this.template.querySelector('div.myheader');
        const titleElement = headerElement.querySelector('div.slds-page-header__col-title');
        const gutters = headerElement.querySelectorAll('div.slds-page-header__row_gutters');
        let guttersHeight = 0;
        gutters.forEach(e => {
            guttersHeight += e.clientHeight;
        });
        this.headerHeight = titleElement.clientHeight + guttersHeight + 32;
    }

    handleScroll() {
        const headerElement = this.template.querySelector('div.myheader');
        if (!this.shouldResizeHeader && window.scrollY < 100) {
            this.shouldResizeHeader = true;
        }
        if (window.scrollY == 0) {
            this.shouldResetHeader = true;
        }
        if (this.shouldResizeHeader) {
            // パディングサイズ計算
            const padding = window.scrollY < 13 ? 12 - window.scrollY : 0;
            // スタイル設定
            headerElement.style.zIndex = "98";
            headerElement.style.left = padding + "px";
            headerElement.style.right = padding + "px";
            headerElement.style.position = "fixed";
            const t = 13 - padding;
            headerElement.style.transform = "translate3d(0px, -" + t + "px, 0px)";
            // 画面上部に張り付いたとき
            if (padding == 0) {
                headerElement.style.borderRadius = "0px";
                // 詳細部分を半透明化
                const gutters = headerElement.querySelectorAll('div.slds-page-header__row_gutters');
                if (gutters.length > 0) {
                    const t2 = window.scrollY > 12 ? window.scrollY - 12 : 0;
                    let guttersHeight = 0;
                    gutters.forEach((e, k) => {
                        guttersHeight += e.clientHeight;
                        const alpha = t2 > guttersHeight ? guttersHeight : t2;
                        if (alpha == guttersHeight) {
                            // 完全にスクロールしたら非表示
                            e.style.visibility = "hidden";
                            if (k >= gutters.length - 1) {
                                // 完全にスクロールしたら処理を省く
                                this.shouldResizeHeader = false;
                            }
                        } else {
                            e.style.visibility = "";
                        }
                        e.style.opacity = (1.0-(alpha / guttersHeight));
                        e.style.transform = "translate3d(0px, -" + t2 + "px, 0px)";
                    });
                    // ヘッダ全体の高さを詳細の移動分だけ低くする
                    const heightDiff = guttersHeight > t2 ? t2 : guttersHeight;
                    headerElement.style.height = (this.headerHeight - heightDiff) + "px";
                }
            } else {
                // 張り付いていない状態になったら角丸復活
                headerElement.style.borderRadius = "";
            }
            // ダミーの高さを設定する
            const proxyElement = this.template.querySelector('div.proxy');
            proxyElement.style.height = this.headerHeight + "px";
        }
        if (this.shouldResetHeader) {
            this.reset();
            this.shouldResetHeader = false;
        }
    }

    reset() {
        const headerElement = this.template.querySelector('div.myheader');
        headerElement.style.left = "";
        headerElement.style.right = "";
        headerElement.style.height = "";
        headerElement.style.position = "";
        headerElement.style.zIndex = "";
        headerElement.style.borderRadius = "";
        headerElement.style.transform = "translate3d(0px, 0px, 0px)";
        const gutters = headerElement.querySelectorAll('div.slds-page-header__row_gutters');
        gutters.forEach(e => {
            e.style.visibility = "";
            e.style.opacity = "";
            e.style.transform = "translate3d(0px, 0px, 0px)";
        });
        const proxyElement = this.template.querySelector('div.proxy');
        proxyElement.style.height = "";
   }

}