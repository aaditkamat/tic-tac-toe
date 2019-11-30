import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { List } from 'immutable';
import Actions from './Actions';
import Board from './Board';
import Toggle from './Toggle';  
import { calculateIndex, findHighlightedSquares, NUM_OF_ROWS, updateArray, fillArray, sliceArray } from './extra'; 
import './index.css';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                currentPlayer: 'X',
                highlightedSquares: [],
                currentBoardValues: fillArray(NUM_OF_ROWS ** 2, '')
            }],
            moves: fillArray(1, ''),
            movesAreSortedInAscending: true,
            currentIndex: 0,
        };
        this.getNewGameState = this.getNewGameState.bind(this);
        this.renderPlayerInfo = this.renderPlayerInfo.bind(this);
        this.goToMove = this.goToMove.bind(this);
        this.updateGameState = this.updateGameState.bind(this);
        this.sortMoves = this.sortMoves.bind(this);
    }

    updateGameState(row, col) {
        const index = calculateIndex(row, col);
        const latest = this.state.history[this.state.currentIndex];
        if (latest.currentBoardValues[index] === '' && latest.highlightedSquares.length === 0) {
            this.setState(state => {
                const newValues = updateArray(latest.currentBoardValues, index, latest.currentPlayer);
                return this.getNewGameState(state, row, col, newValues);
            });
        }
    }

    getNewGameState(state, row, col, values) {
        const latest = state.history[state.currentIndex];
        const currentPlayer = latest.currentPlayer;
        if (latest.highlightedSquares.length !== 0) {
            return state;
        } else {
            const newHistory = sliceArray(0, state.currentIndex, state.history);
            const highlightedSquares = findHighlightedSquares(row, col, values, currentPlayer);
            if (highlightedSquares.length !== 0) {
                newHistory.push({
                    currentPlayer: currentPlayer,
                    highlightedSquares: highlightedSquares,
                    currentBoardValues: values
                });
            } else {
                const newPlayer = currentPlayer === 'X' ? 'O': 'X';
                newHistory.push({ 
                    currentPlayer: newPlayer, 
                    highlightedSquares: highlightedSquares,
                    currentBoardValues: values,
                });
            }
            const newMoves = sliceArray(0, state.currentIndex, state.moves);
            newMoves.push(`(${row + 1}, ${col + 1})`);
            return {history: newHistory, moves: newMoves, currentIndex: state.currentIndex + 1};
        }
    }

    goToMove(num) {
        this.setState(state => {
            return { history: state.history, moves: state.moves, currentIndex: num }
        });
    }

    sortMoves() {
        this.setState(state => {
            return {
                history: state.history,
                moves: state.moves,
                movesAreSortedInAscending: !state.movesAreSortedInAscending,
                currentIndex: state.currentIndex
            }
        });
    }

    renderPlayerInfo() {
        const latest = this.state.history[this.state.currentIndex];
        if (List(latest.currentBoardValues).filter(x => x === '').toArray().length === 0 && latest.highlightedSquares.length === 0) {
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

    render() {
        const latest = this.state.history[this.state.currentIndex];
        return (
            <div className="container" >
                <div className="row">
                    { this.renderPlayerInfo() }
                </div>  
                <Board updateGameState={this.updateGameState} values={latest.currentBoardValues} highlightedSquares={latest.highlightedSquares}/>
                <div className="row">
                    <Actions moves={this.state.moves} goToMove={this.goToMove} movesAreSortedInAscending={this.state.movesAreSortedInAscending} /> 
                    <Toggle sortMoves={this.sortMoves} isAscending={this.state.movesAreSortedInAscending}/> 
                </div>  
            </div>
        );
    }
};

ReactDOM.render(<Game />, document.getElementById('root'));