 declare namespace Game {
    interface History {
        currentBoardValues: string[];
        currentPlayer: string;
        highlightedSquares: number[];
    }
    interface State {
        currentIndex: number;
        history: History[];
        moves: string[];
        movesAreSortedInAscending: boolean;
    }
}


declare namespace Actions {
    interface Props {
        moves: string[];
        goToMove: (num: number) => void;
        movesAreSortedInAscending: boolean;
    }
    interface State {
        selectedIndex: number;
    }
}

declare namespace Action {
    interface Props {
        handleClick: () => void,
        textisBold: boolean,
        moveLabel: string,
    }
}

declare namespace Toggle {
    interface Props {
        sortMoves: () => void;
        isAscending: boolean;
    }
}

declare namespace Board {
    interface Props {
        values: string[];
        highlightedSquares: number[];
        updateGameState: (row: number, col: number) => void;
    }
}

declare namespace Box {
    interface Props {
        isHighlighted: boolean;
        handleClick: (row: number, col: number) => void;
        row: number;
        col: number;
        currentPlayer: string;
    }
}
