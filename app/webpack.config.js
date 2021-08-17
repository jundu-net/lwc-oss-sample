const HtmlWebpackPlugin = require('html-webpack-plugin');
const LwcWebpackPlugin = require('lwc-webpack-plugin')
// Htmlテンプレートを複数指定するためlwc-services内で必ず定義されるHtmlWebpackPluginとは重複しない名前のプラグインを作成
class HtmlWebpackPlugin2 extends HtmlWebpackPlugin {}

module.exports = {
    entry: {
        index: ['./src/prepare.js', './src/index.js'],  // 日付フォーマット関連処理を上書きするため先にprepare.jsを読み込む
        login: './src/login.js',
    },
    // output: {
    //     filename: '[name].js',
    //     path: __dirname + '/dist'
    // }
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin2({    // webpack-plugin-overridesで削除されないように別名クラス指定
            filename: 'login.html',
            template: './src/login.html',
            chunks: ['login']
        }),
        new LwcWebpackPlugin({  // 日本のロケール対応
            stylesheetConfig: {},
            outputConfig: {
                compat: false,
                minify: true,
                env: {
                    NODE_ENV: 'production'
                },
                format: 'amd'
            },
            experimentalDynamicComponent: {},
            modules: [
                {
                    "name": "@salesforce/i18n/lang",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-lang.js"
                },
                {
                    "name": "@salesforce/i18n/dir",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-dir.js"
                },
                {
                    "name": "@salesforce/i18n/locale",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-locale.js"
                },
                {
                    "name": "@salesforce/i18n/timeZone",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-timeZone.js"
                },
                {
                    "name": "@salesforce/i18n/currency",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-currency.js"
                },
                {
                    "name": "@salesforce/i18n/firstDayOfWeek",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-firstDayOfWeek.js"
                },
                {
                    "name": "@salesforce/i18n/dateTime.shortDateFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-dateTime.shortDateFormat.js"
                },
                {
                    "name": "@salesforce/i18n/dateTime.mediumDateFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-dateTime.mediumDateFormat.js"
                },
                {
                    "name": "@salesforce/i18n/dateTime.longDateFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-dateTime.longDateFormat.js"
                },
                {
                    "name": "@salesforce/i18n/dateTime.shortDateTimeFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-dateTime.shortDateTimeFormat.js"
                },
                {
                    "name": "@salesforce/i18n/dateTime.mediumDateTimeFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-dateTime.mediumDateTimeFormat.js"
                },
                {
                    "name": "@salesforce/i18n/dateTime.shortTimeFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-dateTime.shortTimeFormat.js"
                },
                {
                    "name": "@salesforce/i18n/dateTime.mediumTimeFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-dateTime.mediumTimeFormat.js"
                },
                {
                    "name": "@salesforce/i18n/number.numberFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-number.numberFormat.js"
                },
                {
                    "name": "@salesforce/i18n/number.percentFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-number.percentFormat.js"
                },
                {
                    "name": "@salesforce/i18n/number.currencyFormat",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-number.currencyFormat.js"
                },
                {
                    "name": "@salesforce/i18n/number.currencySymbol",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-number.currencySymbol.js"
                },
                {
                    "name": "@salesforce/i18n/number.groupingSeparator",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-number.groupingSeparator.js"
                },
                {
                    "name": "@salesforce/i18n/number.decimalSeparator",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-number.decimalSeparator.js"
                },
                {
                    "name": "@salesforce/i18n/showJapaneseCalendar",
                    "path": __dirname + "/src/scopedImports/@salesforce-i18n-showJapaneseCalendar.js"
                },
                {
                    "name": "@salesforce/label/LightningErrorMessage.validityBadInput",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningErrorMessage.validityBadInput.js"
                },
                {
                    "name": "@salesforce/label/LightningErrorMessage.validityPatternMismatch",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningErrorMessage.validityPatternMismatch.js"
                },
                {
                    "name": "@salesforce/label/LightningErrorMessage.validityTypeMismatch",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningErrorMessage.validityTypeMismatch.js"
                },
                {
                    "name": "@salesforce/label/LightningErrorMessage.validityValueMissing",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningErrorMessage.validityValueMissing.js"
                },
                {
                    "name": "@salesforce/label/LightningErrorMessage.validityRangeOverflow",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningErrorMessage.validityRangeOverflow.js"
                },
                {
                    "name": "@salesforce/label/LightningErrorMessage.validityRangeUnderflow",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningErrorMessage.validityRangeUnderflow.js"
                },
                {
                    "name": "@salesforce/label/LightningErrorMessage.validityStepMismatch",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningErrorMessage.validityStepMismatch.js"
                },
                {
                    "name": "@salesforce/label/LightningErrorMessage.validityTooLong",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningErrorMessage.validityTooLong.js"
                },
                {
                    "name": "@salesforce/label/LightningErrorMessage.validityTooShort",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningErrorMessage.validityTooShort.js"
                },
                {
                    "name": "@salesforce/label/LightningCarousel.tabString",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningCarousel.tabString.js"
                },
                {
                    "name": "@salesforce/label/LightningCarousel.autoPlay",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningCarousel.autoPlay.js"
                },
                {
                    "name": "@salesforce/label/LightningInputFile.buttonLabel",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningInputFile.buttonLabel.js"
                },
                {
                    "name": "@salesforce/label/LightningInputFile.bodyText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningInputFile.bodyText.js"
                },
                {
                    "name": "@salesforce/label/LightningInputLocation.latitude",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningInputLocation.latitude.js"
                },
                {
                    "name": "@salesforce/label/LightningInputLocation.longitude",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningInputLocation.longitude.js"
                },
                {
                    "name": "@salesforce/label/LightningInputLocation.invalidLatitude",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningInputLocation.invalidLatitude.js"
                },
                {
                    "name": "@salesforce/label/LightningInputLocation.invalidLongitude",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningInputLocation.invalidLongitude.js"
                },
                {
                    "name": "@salesforce/label/LightningInputLocation.coordinateIsRequired",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningInputLocation.coordinateIsRequired.js"
                },
                {
                    "name": "@salesforce/label/LightningFormattedEmail.emailIconLabel",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningFormattedEmail.emailIconLabel.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextAssist.chooseFont",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextAssist.chooseFont.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextAssist.chooseSize",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextAssist.chooseSize.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextAssist.composeText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextAssist.composeText.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextButton.bold",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextButton.bold.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextButton.italic",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextButton.italic.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextButton.underline",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextButton.underline.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextButton.strike",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextButton.strike.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextButton.bullet",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextButton.bullet.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextButton.number",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextButton.number.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextButton.indent",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextButton.indent.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextButton.outdent",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextButton.outdent.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextButton.leftAlign",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextButton.leftAlign.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextButton.centerAlign",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextButton.centerAlign.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextButton.rightAlign",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextButton.rightAlign.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextButton.moreActions",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextButton.moreActions.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextButton.link",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextButton.link.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextButton.image",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextButton.image.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextButton.video",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextButton.video.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextButton.removeFormatting",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextButton.removeFormatting.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextEditor.formatText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextEditor.formatText.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextEditor.formatBackground",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextEditor.formatBackground.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextEditor.formatBody",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextEditor.formatBody.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextEditor.alignText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextEditor.alignText.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextEditor.insertContent",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextEditor.insertContent.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextEditor.insertVideo",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextEditor.insertVideo.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextEditor.removeFormatting",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextEditor.removeFormatting.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextEditor.formatFont",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextEditor.formatFont.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextEditor.font",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextEditor.font.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextEditor.fontSize",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextEditor.fontSize.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextEditor.linkInput",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextEditor.linkInput.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextEditor.linkSave",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextEditor.linkSave.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextEditor.linkCancel",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextEditor.linkCancel.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextEditor.imageSizeExceeded",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextEditor.imageSizeExceeded.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextEditor.imageUploadFailed",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextEditor.imageUploadFailed.js"
                },
                {
                    "name": "@salesforce/label/LightningRichTextEditor.imageUploadNotSupported",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRichTextEditor.imageUploadNotSupported.js"
                },
                {
                    "name": "@salesforce/label/LightningControl.required",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningControl.required.js"
                },
                {
                    "name": "@salesforce/label/LightningControl.active",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningControl.active.js"
                },
                {
                    "name": "@salesforce/label/LightningControl.activeCapitalized",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningControl.activeCapitalized.js"
                },
                {
                    "name": "@salesforce/label/LightningControl.inactive",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningControl.inactive.js"
                },
                {
                    "name": "@salesforce/label/LightningControl.inactiveCapitalized",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningControl.inactiveCapitalized.js"
                },
                {
                    "name": "@salesforce/label/LightningControl.loading",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningControl.loading.js"
                },
                {
                    "name": "@salesforce/label/LightningControl.clear",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningControl.clear.js"
                },
                {
                    "name": "@salesforce/label/LightningInputNumber.incrementCounter",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningInputNumber.incrementCounter.js"
                },
                {
                    "name": "@salesforce/label/LightningInputNumber.decrementCounter",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningInputNumber.decrementCounter.js"
                },
                {
                    "name": "@salesforce/label/LightningPill.warning",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningPill.warning.js"
                },
                {
                    "name": "@salesforce/label/LightningPill.remove",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningPill.remove.js"
                },
                {
                    "name": "@salesforce/label/LightningPill.error",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningPill.error.js"
                },
                {
                    "name": "@salesforce/label/LightningPill.delete",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningPill.delete.js"
                },
                {
                    "name": "@salesforce/label/LightningPill.deleteAndNavigate",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningPill.deleteAndNavigate.js"
                },
                {
                    "name": "@salesforce/label/LightningPillContainer.label",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningPillContainer.label.js"
                },
                {
                    "name": "@salesforce/label/LightningPillContainer.more",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningPillContainer.more.js"
                },
                {
                    "name": "@salesforce/label/LightningProgressBar.progress",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningProgressBar.progress.js"
                },
                {
                    "name": "@salesforce/label/LightningClickToDial.enabled",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningClickToDial.enabled.js"
                },
                {
                    "name": "@salesforce/label/LightningClickToDial.disabled",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningClickToDial.disabled.js"
                },
                {
                    "name": "@salesforce/label/LightningDualListbox.componentAssistiveText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDualListbox.componentAssistiveText.js"
                },
                {
                    "name": "@salesforce/label/LightningDualListbox.moveSelectionToAssistiveText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDualListbox.moveSelectionToAssistiveText.js"
                },
                {
                    "name": "@salesforce/label/LightningDualListbox.upButtonAssistiveText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDualListbox.upButtonAssistiveText.js"
                },
                {
                    "name": "@salesforce/label/LightningDualListbox.downButtonAssistiveText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDualListbox.downButtonAssistiveText.js"
                },
                {
                    "name": "@salesforce/label/LightningDualListbox.optionLockAssistiveText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDualListbox.optionLockAssistiveText.js"
                },
                {
                    "name": "@salesforce/label/LightningDualListbox.maxHelp",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDualListbox.maxHelp.js"
                },
                {
                    "name": "@salesforce/label/LightningDualListbox.minHelp",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDualListbox.minHelp.js"
                },
                {
                    "name": "@salesforce/label/LightningDualListbox.maxError",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDualListbox.maxError.js"
                },
                {
                    "name": "@salesforce/label/LightningDualListbox.minErrorPlural",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDualListbox.minErrorPlural.js"
                },
                {
                    "name": "@salesforce/label/LightningDualListbox.minErrorSingular",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDualListbox.minErrorSingular.js"
                },
                {
                    "name": "@salesforce/label/LightningDualListbox.requiredError",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDualListbox.requiredError.js"
                },
                {
                    "name": "@salesforce/label/LightningDualListbox.minRequiredErrorPlural",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDualListbox.minRequiredErrorPlural.js"
                },
                {
                    "name": "@salesforce/label/LightningDualListbox.minRequiredErrorSingular",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDualListbox.minRequiredErrorSingular.js"
                },
                {
                    "name": "@salesforce/label/LightningDualListbox.requiredOptionError",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDualListbox.requiredOptionError.js"
                },
                {
                    "name": "@salesforce/label/LightningProgressIndicator.stageComplete",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningProgressIndicator.stageComplete.js"
                },
                {
                    "name": "@salesforce/label/LightningProgressIndicator.currentStage",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningProgressIndicator.currentStage.js"
                },
                {
                    "name": "@salesforce/label/LightningListView.loadMore",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningListView.loadMore.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.selectAll",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.selectAll.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.selectItem",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.selectItem.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.columnWidth",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.columnWidth.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.sort",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.sort.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.sortAsc",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.sortAsc.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.sortDesc",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.sortDesc.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.sortNone",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.sortNone.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.loading",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.loading.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.showActions",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.showActions.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.wrapText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.wrapText.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.clipText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.clipText.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.edit",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.edit.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.editHasError",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.editHasError.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.chooseARow",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.chooseARow.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.save",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.save.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.apply",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.apply.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.cancel",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.cancel.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.error",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.error.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.closeButtonAssistiveText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.closeButtonAssistiveText.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.rowLevelErrorAssistiveText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.rowLevelErrorAssistiveText.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.updateSelectedItems",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.updateSelectedItems.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.rowActionsDefaultAriaLabel",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.rowActionsDefaultAriaLabel.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.ariaLiveNavigationMode",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.ariaLiveNavigationMode.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.ariaLiveActionMode",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.ariaLiveActionMode.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.rowNumber",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.rowNumber.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.true",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.true.js"
                },
                {
                    "name": "@salesforce/label/LightningDatatable.false",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDatatable.false.js"
                },
                {
                    "name": "@salesforce/label/LightningVerticalNavigation.newItems",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningVerticalNavigation.newItems.js"
                },
                {
                    "name": "@salesforce/label/LightningVerticalNavigation.showLess",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningVerticalNavigation.showLess.js"
                },
                {
                    "name": "@salesforce/label/LightningVerticalNavigation.showMore",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningVerticalNavigation.showMore.js"
                },
                {
                    "name": "@salesforce/label/LightningVerticalNavigation.subPage",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningVerticalNavigation.subPage.js"
                },
                {
                    "name": "@salesforce/label/LightningNoticeFooter.okButton",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningNoticeFooter.okButton.js"
                },
                {
                    "name": "@salesforce/label/LightningSlider.slider",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningSlider.slider.js"
                },
                {
                    "name": "@salesforce/label/LightningCombobox.placeholder",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningCombobox.placeholder.js"
                },
                {
                    "name": "@salesforce/label/LightningCombobox.pillCloseButtonAlternativeText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningCombobox.pillCloseButtonAlternativeText.js"
                },
                {
                    "name": "@salesforce/label/LightningCombobox.selectedLabelSingle",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningCombobox.selectedLabelSingle.js"
                },
                {
                    "name": "@salesforce/label/LightningCombobox.selectedLabelMore",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningCombobox.selectedLabelMore.js"
                },
                {
                    "name": "@salesforce/label/LightningCombobox.currentSelection",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningCombobox.currentSelection.js"
                },
                {
                    "name": "@salesforce/label/LightningCombobox.ariaSelectedOptions",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningCombobox.ariaSelectedOptions.js"
                },
                {
                    "name": "@salesforce/label/LightningCombobox.loadingText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningCombobox.loadingText.js"
                },
                {
                    "name": "@salesforce/label/LightningCombobox.deselectOptionKeyboard",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningCombobox.deselectOptionKeyboard.js"
                },
                {
                    "name": "@salesforce/label/LightningColorPickerPanel.defaultTab",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningColorPickerPanel.defaultTab.js"
                },
                {
                    "name": "@salesforce/label/LightningColorPickerPanel.customTab",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningColorPickerPanel.customTab.js"
                },
                {
                    "name": "@salesforce/label/LightningColorPicker.colorPickerInstructions",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningColorPicker.colorPickerInstructions.js"
                },
                {
                    "name": "@salesforce/label/LightningColorPicker.a11yTriggerText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningColorPicker.a11yTriggerText.js"
                },
                {
                    "name": "@salesforce/label/LightningColorPicker.hueInput",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningColorPicker.hueInput.js"
                },
                {
                    "name": "@salesforce/label/LightningColorPicker.hexLabel",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningColorPicker.hexLabel.js"
                },
                {
                    "name": "@salesforce/label/LightningColorPicker.redAbbr",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningColorPicker.redAbbr.js"
                },
                {
                    "name": "@salesforce/label/LightningColorPicker.rInput",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningColorPicker.rInput.js"
                },
                {
                    "name": "@salesforce/label/LightningColorPicker.greenAbbr",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningColorPicker.greenAbbr.js"
                },
                {
                    "name": "@salesforce/label/LightningColorPicker.gInput",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningColorPicker.gInput.js"
                },
                {
                    "name": "@salesforce/label/LightningColorPicker.blueAbbr",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningColorPicker.blueAbbr.js"
                },
                {
                    "name": "@salesforce/label/LightningColorPicker.bInput",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningColorPicker.bInput.js"
                },
                {
                    "name": "@salesforce/label/LightningColorPicker.doneButton",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningColorPicker.doneButton.js"
                },
                {
                    "name": "@salesforce/label/LightningColorPicker.cancelButton",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningColorPicker.cancelButton.js"
                },
                {
                    "name": "@salesforce/label/LightningColorPicker.errorMessage",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningColorPicker.errorMessage.js"
                },
                {
                    "name": "@salesforce/label/LightningHelptext.buttonAlternativeText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningHelptext.buttonAlternativeText.js"
                },
                {
                    "name": "@salesforce/label/LightningTree.expandBranch",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningTree.expandBranch.js"
                },
                {
                    "name": "@salesforce/label/LightningTree.collapseBranch",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningTree.collapseBranch.js"
                },
                {
                    "name": "@salesforce/label/LightningDateTimePicker.previousMonth",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDateTimePicker.previousMonth.js"
                },
                {
                    "name": "@salesforce/label/LightningDateTimePicker.nextMonth",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDateTimePicker.nextMonth.js"
                },
                {
                    "name": "@salesforce/label/LightningDateTimePicker.yearSelector",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDateTimePicker.yearSelector.js"
                },
                {
                    "name": "@salesforce/label/LightningDateTimePicker.today",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDateTimePicker.today.js"
                },
                {
                    "name": "@salesforce/label/LightningDateTimePicker.ariaLabelMonth",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDateTimePicker.ariaLabelMonth.js"
                },
                {
                    "name": "@salesforce/label/LightningDateTimePicker.selectDate",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDateTimePicker.selectDate.js"
                },
                {
                    "name": "@salesforce/label/LightningDateTimePicker.dateLabel",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDateTimePicker.dateLabel.js"
                },
                {
                    "name": "@salesforce/label/LightningDateTimePicker.timeLabel",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDateTimePicker.timeLabel.js"
                },
                {
                    "name": "@salesforce/label/LightningDateTimePicker.invalidDate",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDateTimePicker.invalidDate.js"
                },
                {
                    "name": "@salesforce/label/LightningDateTimePicker.rangeOverflow",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDateTimePicker.rangeOverflow.js"
                },
                {
                    "name": "@salesforce/label/LightningDateTimePicker.rangeUnderflow",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDateTimePicker.rangeUnderflow.js"
                },
                {
                    "name": "@salesforce/label/LightningDateTimePicker.minRangeMessage",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDateTimePicker.minRangeMessage.js"
                },
                {
                    "name": "@salesforce/label/LightningDateTimePicker.maxRangeMessage",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDateTimePicker.maxRangeMessage.js"
                },
                {
                    "name": "@salesforce/label/LightningDateTimePicker.minAndMaxRangeMessage",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDateTimePicker.minAndMaxRangeMessage.js"
                },
                {
                    "name": "@salesforce/label/LightningPrimitiveCellActions.showActions",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningPrimitiveCellActions.showActions.js"
                },
                {
                    "name": "@salesforce/label/LightningPrimitiveCellActions.loadingActions",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningPrimitiveCellActions.loadingActions.js"
                },
                {
                    "name": "@salesforce/label/LightningInputName.salutation",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningInputName.salutation.js"
                },
                {
                    "name": "@salesforce/label/LightningInputName.firstName",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningInputName.firstName.js"
                },
                {
                    "name": "@salesforce/label/LightningInputName.middleName",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningInputName.middleName.js"
                },
                {
                    "name": "@salesforce/label/LightningInputName.informalName",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningInputName.informalName.js"
                },
                {
                    "name": "@salesforce/label/LightningInputName.lastName",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningInputName.lastName.js"
                },
                {
                    "name": "@salesforce/label/LightningInputName.suffix",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningInputName.suffix.js"
                },
                {
                    "name": "@salesforce/label/LightningInputName.none",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningInputName.none.js"
                },
                {
                    "name": "@salesforce/label/LightningPrimitiveCellTree.expandBranch",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningPrimitiveCellTree.expandBranch.js"
                },
                {
                    "name": "@salesforce/label/LightningPrimitiveCellTree.collapseBranch",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningPrimitiveCellTree.collapseBranch.js"
                },
                {
                    "name": "@salesforce/label/LightningRecordEditForm.apiNameMismatch",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRecordEditForm.apiNameMismatch.js"
                },
                {
                    "name": "@salesforce/label/LightningRecordEditForm.genericError",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRecordEditForm.genericError.js"
                },
                {
                    "name": "@salesforce/label/LightningRecordEditForm.invalidID",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRecordEditForm.invalidID.js"
                },
                {
                    "name": "@salesforce/label/LightningRecordEditForm.invalidActionAsHandler",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRecordEditForm.invalidActionAsHandler.js"
                },
                {
                    "name": "@salesforce/label/LightningRecordForm.save",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRecordForm.save.js"
                },
                {
                    "name": "@salesforce/label/LightningRecordForm.cancel",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRecordForm.cancel.js"
                },
                {
                    "name": "@salesforce/label/LightningRecordForm.loading",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningRecordForm.loading.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.add",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.add.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.advancedSearchMobile",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.advancedSearchMobile.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.createNewObject",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.createNewObject.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.currentSelection",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.currentSelection.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.emptyStateNoResultText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.emptyStateNoResultText.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.emptyStateNoResultMRUText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.emptyStateNoResultMRUText.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.emptyStateNoResultMRUWithoutText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.emptyStateNoResultMRUWithoutText.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.messageWhenBadInputDefault",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.messageWhenBadInputDefault.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.panelHeaderMobile",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.panelHeaderMobile.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.recentObject",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.recentObject.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.resultsListHeaderMobile",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.resultsListHeaderMobile.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.search",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.search.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.searchObjectsPlaceholder",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.searchObjectsPlaceholder.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.searchObjectsPlaceholderMobile",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.searchObjectsPlaceholderMobile.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.searchPlaceholder",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.searchPlaceholder.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.searchForInObject",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.searchForInObject.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.selectObject",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.selectObject.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.typeaheadResultsListHeaderMobile",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.typeaheadResultsListHeaderMobile.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.unknownRecord",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.unknownRecord.js"
                },
                {
                    "name": "@salesforce/label/LightningLookup.none",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningLookup.none.js"
                },
                {
                    "name": "@salesforce/label/LightningPicklist.available",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningPicklist.available.js"
                },
                {
                    "name": "@salesforce/label/LightningPicklist.chosen",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningPicklist.chosen.js"
                },
                {
                    "name": "@salesforce/label/LightningPicklist.noneLabel",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningPicklist.noneLabel.js"
                },
                {
                    "name": "@salesforce/label/LightningMap.coordinatesTitle",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningMap.coordinatesTitle.js"
                },
                {
                    "name": "@salesforce/label/LightningMap.openInGoogleMaps",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningMap.openInGoogleMaps.js"
                },
                {
                    "name": "@salesforce/label/LightningMap.iframeTitle",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningMap.iframeTitle.js"
                },
                {
                    "name": "@salesforce/label/LightningPrimitiveCoordinate.selected",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningPrimitiveCoordinate.selected.js"
                },
                {
                    "name": "@salesforce/label/LightningButtonMenu.loading",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningButtonMenu.loading.js"
                },
                {
                    "name": "@salesforce/label/LightningButtonMenu.showMenu",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningButtonMenu.showMenu.js"
                },
                {
                    "name": "@salesforce/label/LightningTabs.overflowMore",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningTabs.overflowMore.js"
                },
                {
                    "name": "@salesforce/label/LightningTabs.overflowMoreTitle",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningTabs.overflowMoreTitle.js"
                },
                {
                    "name": "@salesforce/label/LightningTabs.overflowMoreAlternativeText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningTabs.overflowMoreAlternativeText.js"
                },
                {
                    "name": "@salesforce/label/LightningTabs.errorStateAlternativeText",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningTabs.errorStateAlternativeText.js"
                },
                {
                    "name": "@salesforce/label/Duration.secondsLater",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-Duration.secondsLater.js"
                },
                {
                    "name": "@salesforce/label/Duration.secondsAgo",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-Duration.secondsAgo.js"
                },
                {
                    "name": "@salesforce/label/LightningDialog.close",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningDialog.close.js"
                },
                {
                    "name": "@salesforce/label/LightningMessageChannel.publishWithoutContext",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningMessageChannel.publishWithoutContext.js"
                },
                {
                    "name": "@salesforce/label/LightningMessageChannel.invalidScope",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningMessageChannel.invalidScope.js"
                },
                {
                    "name": "@salesforce/label/LightningServiceCloudVoiceToolkitApi.missingNbaParams",
                    "path": __dirname + "/src/scopedImports/@salesforce-label-LightningServiceCloudVoiceToolkitApi.missingNbaParams.js"
                },
            ]
        })
    ]
};