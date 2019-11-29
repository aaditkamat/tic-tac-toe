import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Range } from 'immutable';
import Actions from './Actions';
import Board from './Board';   
import { calculateIndex, checkRow,  checkCol, checkLeftDiagonal, checkRightDiagonal, NUM_OF_ROWS} from './extra'; 
import './index.css';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                currentPlayer: 'X',
                hasWinner: false,
                currentBoardValues: Range(0, NUM_OF_ROWS ** 2).map(() => '').toArray()
            }],
            currentIndex: 0
        };
        this.getNewGameState = this.getNewGameState.bind(this);
        this.showPlayerInfo = this.showPlayerInfo.bind(this);
        this.goToMove = this.goToMove.bind(this);
        this.updateGameState = this.updateGameState.bind(this);
    }

    updateGameState(row, col) {
        const index = calculateIndex(row, col);
        const latest = this.state.history[this.state.currentIndex];
        if (latest.currentBoardValues[index] === '' && !latest.hasWinner) {
            this.setState(state => {
                const newValues = Range(0, 9).map(num => num === index ? latest.currentPlayer : latest.currentBoardValues[num]).toArray();
                return this.getNewGameState(state, row, col, newValues);
            });
        }
    }

    getNewGameState(state, row, col, values,) {
        const latest = state.history[state.currentIndex];
        const gameIsWon = checkRow(values, row, latest.currentPlayer) || checkCol(values, col, latest.currentPlayer) || checkLeftDiagonal(values, row, col, latest.currentPlayer) || checkRightDiagonal(values, row, col, latest.currentPlayer);
        if (gameIsWon && latest.hasWinner) {
            return state;
        } else {
            const newHistory =  Range(0, state.currentIndex + 1).map(num => state.history[num]).toArray();
            if (gameIsWon && !latest.hasWinner) {
                newHistory.push({
                    currentPlayer: latest.currentPlayer,
                    hasWinner: true,
                    currentBoardValues: values
                });
            } else {
                const newPlayer = latest.currentPlayer === 'X' ? 'O': 'X';
                newHistory.push({ 
                    currentPlayer: newPlayer, 
                    hasWinner: false,
                    currentBoardValues: values
                });
            }
            return {history: newHistory, currentIndex: state.currentIndex + 1};
        }
    }

    goToMove(num) {
        this.setState(state => {
            return { history: state.history, currentIndex: num }
        });
    }

    showPlayerInfo() {
        const latest = this.state.history[this.state.currentIndex];
        if (!latest.hasWinner) {
            return (
                <div className="playerInfo">{`Next player: ${latest.currentPlayer}`}</div>
            );
        }
        return (
            <div className="playerInfo">{`Winner: ${latest.currentPlayer}`}</div>
        )
    }

    render() {
        const latest = this.state.history[this.state.currentIndex];
        const noOfMoves = this.state.history.length;
        return (
            <div className="container" >
                <div className="row">
                    { this.showPlayerInfo() }
                </div>  
                <Board updateGameState={this.updateGameState} values={latest.currentBoardValues} /> 
                <Actions noOfMoves={noOfMoves} goToMove={this.goToMove}/>     
            </div>
        );
    }
};

ReactDOM.render(<Game />, document.getElementById('root'));