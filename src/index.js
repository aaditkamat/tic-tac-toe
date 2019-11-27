import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';    
import './index.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayer: 'X',
        };
        this.updatePlayer = this.updatePlayer.bind(this);
    }

    updatePlayer() {
        this.setState(state => {
            const currentPlayer = state.currentPlayer === 'X' ? 'O': 'X';
            return { currentPlayer: currentPlayer };
        });
    }

    render() {
        return (
            <div className="container" >
                <div className="row">
                    <div className="playerInfo">{`Next player: ${this.state.currentPlayer}`}</div>
                </div>  
                <Board currentPlayer={this.state.currentPlayer} updatePlayer={this.updatePlayer} />      
            </div>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('root'));