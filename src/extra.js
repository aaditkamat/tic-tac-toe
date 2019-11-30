import { Range, List }  from 'immutable';

export const NUM_OF_ROWS = 3;

export const calculateIndex = (row, col) => {
    return NUM_OF_ROWS * row + col;
}

const rowIndices = (row) => {
    return Range(0, NUM_OF_ROWS).map(col => calculateIndex(row, col));
}

const columnIndices = (col) => {
    return Range(0, NUM_OF_ROWS).map(row => calculateIndex(row, col));
}

const diagonalIndices = (type) => {
    return type === 'left' ? Range(0, NUM_OF_ROWS).map(row => calculateIndex(row, row)) : Range(0, NUM_OF_ROWS).map(col => calculateIndex(NUM_OF_ROWS - col - 1, col))
}

const checkCondition = (indices, values, player) => {
    return indices.map(index => values[index]).filter(value => value !== player).toArray().length === 0;
}

const checkLeftDiagonal = (values, player) => {
    return checkCondition(diagonalIndices('left'), values, player)
}

const checkRightDiagonal = (values, player) => {
    return checkCondition(diagonalIndices('right'), values, player);
}

const checkColumn = (values, col, player) => {
    return checkCondition(columnIndices(col), values, player);
}

const checkRow = (values, row, player) => {
    return checkCondition(rowIndices(row), values, player);
}

export const findHighlightedSquares = (row, col, values, player) => {
    if (checkRow(values, row, player)) {
        return rowIndices(row);
    } else if (checkColumn(values, col, player)) {
        return columnIndices(col);
    } else if (checkLeftDiagonal(values, player)) {
        return diagonalIndices('left');
    } else if (checkRightDiagonal(values, player)) {
        return diagonalIndices('right');
    } else {
        return [];
    }
}

export const fillArray = (length, value) => {
    return Range(0, length).map(() => value).toArray();
}

export const updateArray = (array, index, value) => {
    const newArray = copyArray(array);
    newArray[index] = value;
    return newArray;
}

export const sliceArray = (start, end, array) => {
    return Range(start, end + 1).map(num => array[num]).toArray();
}

export const findInArray = (element, array) => {
    return array.indexOf(element) !== -1
}

const copyArray = (array) => {
    return List(array).toArray();
}

export const reverseArray = (array) => {
    return List(array).reverse().toArray();
}