const CODES = {
    A: 65,
    Z: 90
};

function createCel() {
    return `
        <div class="row__cell cell" contenteditable></div>
    `;
}

function createCol(col) {
    return `
        <div class="row__column column">${col}</div>
    `;
}

function createRow(index, content) {
    return `
        <div class="row">
            <div class="row__info">${index ? index : ''}</div>
            <div class="row__data">${content}</div>
        </div>
    `;
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 10) {
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
