import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';   
import { checkRow,  checkCol, checkLeftDiagonal, checkRightDiagonal } from './extra'; 
import './index.css';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayer: 'X',
            hasWinner: false
        };
        this.updateGameState = this.updateGameState.bind(this);
        this.showPlayerInfo = this.showPlayerInfo.bind(this);
    }

    updateGameState(row, col, values) {
        this.setState(state => {
            const gameIsWon = checkRow(values, row, state.currentPlayer) || checkCol(values, col, state.currentPlayer) || checkLeftDiagonal(values, row, col, state.currentPlayer) || checkRightDiagonal(values, row, col, state.currentPlayer);
            if (gameIsWon) {
                return {
                    currentPlayer: state.currentPlayer,
                    hasWinner: true
                }
            } else {
                const newPlayer = state.currentPlayer === 'X' ? 'O': 'X';
                return { 
                    currentPlayer: newPlayer, 
                    hasWinner: false
                };
            }
        });
    }

    showPlayerInfo() {
        if (!this.state.hasWinner) {
            return (
                <div className="playerInfo">{`Next player: ${this.state.currentPlayer}`}</div>
            );
        }
        return (
            <div className="playerInfo">{`Winner: ${this.state.currentPlayer}`}</div>
        )
    }

    render() {
        return (
            <div className="container" >
                <div className="row">
                    { this.showPlayerInfo() }
                </div>  
                <Board currentPlayer={this.state.currentPlayer} hasWinner={this.state.hasWinner} updateGameState={this.updateGameState} />      
            </div>
        );
    }
};

ReactDOM.render(<Game />, document.getElementById('root'));