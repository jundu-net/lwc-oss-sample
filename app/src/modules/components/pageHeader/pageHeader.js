import { LightningElement, api } from 'lwc';

export default class PageHeader extends LightningElement {

    static get PADDING() { return 12 }

    @api title;
    @api subTitle;
    @api iconName;
    @api iconAlternativeText;
    @api iconTitle;

    shouldResizeHeader = false;
    shouldResetHeader = false;

    connectedCallback() {
        // スクロールイベントを登録
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const headerElement = this.template.querySelector('div.myheader');
        if (!this.shouldResizeHeader && window.scrollY < 300) {
            this.shouldResizeHeader = true;
        }
        if (window.scrollY == 0) {
            this.shouldResetHeader = true;
        }
        if (this.shouldResizeHeader) {
            // ヘッダ部分の高さをダミー用に計算する
            const titleElement = headerElement.querySelector('div.slds-page-header__col-title');
            const gutters = headerElement.querySelectorAll('div.slds-page-header__row_gutters');
            let guttersHeight = 0;
            gutters.forEach(e => {
                guttersHeight += e.clientHeight;
            });
            const headerHeight = titleElement.clientHeight + guttersHeight + 32;    // TODO 32はheaderElementの上下のPaddingから取得すべき
            // パディングサイズ計算
            const padding = window.scrollY <= PageHeader.PADDING ? PageHeader.PADDING - window.scrollY : 0;
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
                if (gutters.length > 0) {
                    const t2 = window.scrollY > PageHeader.PADDING ? window.scrollY - PageHeader.PADDING : 0;
                    let guttersHeight = 0;
                    gutters.forEach((e, k) => {
                        guttersHeight += e.clientHeight;
                        if (t2 >= guttersHeight) {
                            // 完全にスクロールしたら非表示
                            e.style.visibility = "hidden";
                            if (k >= gutters.length - 1) {
                                // 完全にスクロールしたら処理を省く
                                this.shouldResizeHeader = false;
                            }
                        } else {
                            e.style.visibility = "";
                        }
                        const alpha = 1.0 - (((t2 > guttersHeight ? guttersHeight : t2) / guttersHeight) * 1.5);
                        e.style.opacity = alpha < 0 ? 0 : alpha;
                        e.style.transform = "translate3d(0px, -" + t2 + "px, 0px)";
                    });
                    // ヘッダ全体の高さを詳細の移動分だけ低くする
                    const heightDiff = guttersHeight > t2 ? t2 : guttersHeight;
                    headerElement.style.height = (headerHeight - heightDiff) + "px";
                }
            } else {
                // 張り付いていない状態になったら角丸復活
                headerElement.style.borderRadius = "";
            }
            // ダミーの高さを設定する
            const proxyElement = this.template.querySelector('div.proxy');
            proxyElement.style.height = headerHeight + "px";
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