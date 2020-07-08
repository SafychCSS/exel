const CODES = {
    A: 65,
    Z: 90
};

function createCel(_, col) {
    return `
        <div class="row__cell cell" contenteditable data-col="${col}"></div>
    `;
}

function createCol(col, index) {
    return `
        <div class="row__column column" data-type="resizable" data-col="${index}">
            ${col}
            <div class="column__resize" data-resize="col"></div>
        </div>
    `;
}

function createRow(index, content) {
    const resizer = index ? '<div class="row__resize" data-resize="row"></div>' : '';
    return `
        <div class="row" data-type="resizable">
            <div class="row__info">
                ${index ? index : ''}
                ${resizer}
            </div>
            <div class="row__data">${content}</div>
        </div>
    `;
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];
    // <div class="row__column column">A</div>
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createCol)// .map(el => createCol(el)) === .map(createCol)
        .join('');
    rows.push(createRow(null, cols));

    for (let i = 0; i < rowsCount; i += 1) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCel)
            .join('');
        rows.push(createRow(i + 1, cells));
    }

    return rows.join('');
}
