import { Range } from 'immutable';

export const NUM_OF_ROWS = 3;

export const calculateIndex = (row, col) => {
    return NUM_OF_ROWS * row + col;
}

export const checkLeftDiagonal = (values, row, col, player) => {
    if (row === col) {
        return Range(0, NUM_OF_ROWS).map(row => values[calculateIndex(row, row)]).filter(value => value !== player).toArray().length === 0;
    }
    return false;
}

export const checkRightDiagonal = (values, row, col, player) => {
    if (row === NUM_OF_ROWS - col - 1) {
        return Range(0, NUM_OF_ROWS).map(col => values[calculateIndex(NUM_OF_ROWS - col - 1, col)]).filter(value => value !== player).toArray().length === 0;
    }
    return false;
}

export const checkCol = (values, col, player) => {
    return Range(0, NUM_OF_ROWS).map(row => values[calculateIndex(row, col)]).filter(value => value !== player).toArray().length === 0;
}

export const checkRow = (values, row, player) => {
    return Range(0, NUM_OF_ROWS).map(col => values[calculateIndex(row, col)]).filter(value => value !== player).toArray().length === 0;
}