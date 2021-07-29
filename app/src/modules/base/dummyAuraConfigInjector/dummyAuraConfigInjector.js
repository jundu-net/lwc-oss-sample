import defaultLocalizationService from './defaultLocalizationConfig';

export default function injectConfig() {
    if (window.$A !== undefined) {
        console.log('On Salesforce platform. Aura is already enabled.');
        return;
    }
    window.$A = {
        localizationService: defaultLocalizationService,
        getContext: function () {
            return {
                getPathPrefix: function () {
                    return '';
                }
            }
        },
        getToken: function () {
            return undefined;
        }
    };
}