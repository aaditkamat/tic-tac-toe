 declare namespace Game {
    interface History {
        currentPlayer: string;
        highlightedSquares: number[];
        currentBoardValues: string[];
    }
    interface State {
        history: History[];
        moves: string[];
        movesAreSortedInAscending: boolean;
        currentIndex: number;
    }
}

declare namespace Action {
    interface Props {
        moves: string[];
        goToMove: (num: number) => void;
        movesAreSortedInAscending: boolean;
    }
    interface State {
        selectedIndex: number;
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
