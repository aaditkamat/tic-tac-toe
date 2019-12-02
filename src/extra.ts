import { List, Range, Seq } from "immutable";

export const NUM_OF_ROWS: number = 3;

export const calculateIndex = (row: number, col: number) => {
    return NUM_OF_ROWS * row + col;
};

const rowIndices = (row: number) => {
    return Range(0, NUM_OF_ROWS).map((col: number) => calculateIndex(row, col));
};

const columnIndices = (col: number) => {
    return Range(0, NUM_OF_ROWS).map((row: number) => calculateIndex(row, col));
};

const diagonalIndices = (type: string) => {
    if (type === "left") {
        return Range(0, NUM_OF_ROWS).map((row: number) => calculateIndex(row, row));
    }
    return Range(0, NUM_OF_ROWS).map((col: number) => calculateIndex(NUM_OF_ROWS - col - 1, col));
};

const checkCondition = (indices: Seq.Indexed<number>, values: string[], player: string) => {
    return indices.map((index: number) => values[index])
                  .filter((value: string) => value !== player)
                  .toArray()
                  .length === 0;
};

const checkLeftDiagonal = (values: string[], player: string) => {
    return checkCondition(diagonalIndices("left"), values, player);
};

const checkRightDiagonal = (values: string[], player: string) => {
    return checkCondition(diagonalIndices("right"), values, player);
};

const checkColumn = (values: string[], col: number, player: string) => {
    return checkCondition(columnIndices(col), values, player);
};

const checkRow = (values: string[], row: number, player: string) => {
    return checkCondition(rowIndices(row), values, player);
};

export const findHighlightedSquares = (row: number, col: number, values: string[], player: string) => {
    if (checkRow(values, row, player)) {
        return rowIndices(row).toArray();
    } else if (checkColumn(values, col, player)) {
        return columnIndices(col).toArray();
    } else if (checkLeftDiagonal(values, player)) {
        return diagonalIndices("left").toArray();
    } else if (checkRightDiagonal(values, player)) {
        return diagonalIndices("right").toArray();
    } else {
        return [];
    }
};

export const fillArray = (length: number, value: string) => {
    return Range(0, length).map(() => value).toArray();
};

export const updateArray = (array: string[], index: number, value: string) => {
    const newArray = copyArray(array);
    newArray[index] = value;
    return newArray;
};

export const sliceArray = (start: number, end: number, array: string[] | Game.History[]) => {
    return Range(start, end + 1).map((num: number) => array[num]).toArray();
};

export const findInArray = (element: number | string, array: number[] | string[]) => {
    return array.indexOf(element as never) !== -1;
};

const copyArray = (array: string[]) => {
    return List(array).toArray();
};

export const reverseArray = (array: string[]) => {
    return List(array).reverse().toArray();
};
