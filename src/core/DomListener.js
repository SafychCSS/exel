import {capitalize} from '@core/utils';

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root provided for DomListener`);
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            // console.log(listener);
            // тоже что и addEventListener - реализован в Excel.js

            const method = getMethodName(listener);
            if (!this[method]) {
                throw new Error(`Method ${method} is not implemented in ${this.name || ''} Component`);
            }
            // если в on передавать this[method].bind(this) то события удаляться не будут
            // так как это будут разные функции
            this[method] = this[method].bind(this);
            this.$root.on(listener, this[method]);
        });
    }

    removeDOMListener() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            this.$root.off(listener, this[method]);
        });
    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName);
}
