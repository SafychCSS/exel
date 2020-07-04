import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = ['formula', 'excel__formula'];

    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click']
        });
    }

    toHTML() {
        return `
            <div class="formula__fx">fx</div>
            <div class="formula__input" contenteditable spellcheck="false"></div>
        `;
    }

    onInput(e) {
        // console.log(this.$root);
        console.log('Formula: onInput', e.target.textContent.trim());
    }

    onClick(e) {
        console.log('Formula: onClick', e);
    }
}
