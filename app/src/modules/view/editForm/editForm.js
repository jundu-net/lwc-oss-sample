import { LightningElement, track } from 'lwc';

export default class EditForm extends LightningElement {

    @track formData = {
        field1: '寿限無寿限無',
        field2: 'じゅげむじゅげむ',
    }

    handleChange(evt) {
        //console.log(locale);
        let value;
        if (evt.target.type === 'checkbox' || evt.target.type === 'checkbox-button' || evt.target.type === 'toggle') {
            value = evt.target.checked;
        } else {
            value = evt.target.value;
        }
        // プロパティをidから探して、あれば値を自動セットすることも可能
        switch (evt.target.dataset.id) {
            case 'field1':
                this.formData.field1 = value;
                break;
            case 'field2':
                this.formData.field2 = value;
                break;
            default:
                break;
        }
    }

}