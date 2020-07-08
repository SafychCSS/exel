import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
// import {$} from '@core/dom';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
    static className = ['table', 'excel__table'];

    constructor($root) {
        super($root, {
            listeners: ['mousedown', 'mouseup']
        });
    }

    toHTML() {
        return createTable();
    }

    onMousedown(e) {
        if (shouldResize(e)) {
            resizeHandler(this.$root, e);
        }
    }

    onMouseup(e) {

    }

    /*
    onMousemove(e) {
        console.log(e.pageX);
    }
    */
}
