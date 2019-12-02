import React, { Component } from "react";
import ReactDOM from "react-dom";
import Actions from "./Actions";
import Board from "./Board";
import { calculateIndex, fillArray, findHighlightedSquares, findInArray, NUM_OF_ROWS, sliceArray, updateArray } from "./extra";
import "./index.css";
import Toggle from "./Toggle";

class Game extends Component<{}, Game.State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            currentIndex: 0,
            history: [{
                currentBoardValues: fillArray(NUM_OF_ROWS ** 2, ""),
                currentPlayer: "X",
                highlightedSquares: [],
            }],
            moves: fillArray(1, ""),
            movesAreSortedInAscending: true,
        };
        this.getNewGameState = this.getNewGameState.bind(this);
        this.renderPlayerInfo = this.renderPlayerInfo.bind(this);
        this.goToMove = this.goToMove.bind(this);
        this.updateGameState = this.updateGameState.bind(this);
        this.sortMoves = this.sortMoves.bind(this);
    }

    public render() {
        const latest: Game.History = this.state.history[this.state.currentIndex];
        return (
            <div className="container" >
                <div className="row">
                    <div className="col">
                        { this.renderPlayerInfo() }
                    </div>
                </div>
                <Board updateGameState={this.updateGameState}
                       values={latest.currentBoardValues}
                       highlightedSquares={latest.highlightedSquares} />
                <div className="row">
                    <Actions moves={this.state.moves}
                             goToMove={this.goToMove}
                             movesAreSortedInAscending={this.state.movesAreSortedInAscending} />
                    <Toggle sortMoves={this.sortMoves}
                            isAscending={this.state.movesAreSortedInAscending} />
                </div>
            </div>
        );
    }

    public updateGameState(row: number, col: number) {
        const index: number = calculateIndex(row, col);
        const latest: Game.History = this.state.history[this.state.currentIndex];
        if (latest.currentBoardValues[index] === "" && latest.highlightedSquares.length === 0) {
            this.setState((prevState: Game.State) => {
                const newValues: string[] = updateArray(latest.currentBoardValues, index, latest.currentPlayer);
                return this.getNewGameState(prevState, row, col, newValues);
            });
        }
    }

    public getNewGameState(state: Game.State, row: number, col: number, values: string[]) {
        const latest: Game.History = state.history[state.currentIndex];
        const currentPlayer: string = latest.currentPlayer;
        if (latest.highlightedSquares.length !== 0) {
            return state;
        } else {
            const newHistory: Game.History[] = sliceArray(0, state.currentIndex, state.history) as Game.History[];
            const highlightedSquares: number[] = findHighlightedSquares(row, col, values, currentPlayer);
            if (highlightedSquares.length !== 0) {
                newHistory.push({
                    currentBoardValues: values,
                    currentPlayer,
                    highlightedSquares,
                });
            } else {
                const newPlayer: string = currentPlayer === "X" ? "O" : "X";
                newHistory.push({
                    currentBoardValues: values,
                    currentPlayer: newPlayer,
                    highlightedSquares,
                });
            }
            const newMoves: string[] = sliceArray(0, state.currentIndex, state.moves) as string[];
            newMoves.push(`(${row + 1}, ${col + 1})`);
            return {
                currentIndex: state.currentIndex + 1,
                history: newHistory,
                moves: newMoves,
                movesAreSortedInAscending: state.movesAreSortedInAscending,
            };
        }
    }

    public goToMove(num: number) {
        this.setState((prevState: Game.State) => {
            return { history: prevState.history, moves: prevState.moves, currentIndex: num };
        });
    }

    public sortMoves() {
        this.setState((prevState: Game.State) => {
            return {
                currentIndex: prevState.currentIndex,
                history: prevState.history,
                moves: prevState.moves,
                movesAreSortedInAscending: !prevState.movesAreSortedInAscending,
            };
        });
    }

    private renderPlayerInfo() {
        const latest: Game.History = this.state.history[this.state.currentIndex];
        findInArray("", latest.currentBoardValues);
        if (!findInArray("", latest.currentBoardValues) && latest.highlightedSquares.length === 0) {
            return (
                <div className="playerInfo">The game is a draw </div>
            );
        }
        if (latest.highlightedSquares.length === 0) {
            return (
                <div className="playerInfo">{`Next player: ${latest.currentPlayer}`}</div>
            );
        }
        return (
            <div className="playerInfo">{`Winner: ${latest.currentPlayer}`}</div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById("root"));
