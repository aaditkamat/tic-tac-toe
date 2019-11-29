import React from 'react';
import { Range } from 'immutable';
import Box from './Box';
import { calculateIndex } from './extra';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: Range(0, 9).map(() => '').toArray()
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(row, col) {
        const index = calculateIndex(row, col);
        if (this.state.values[index] === '' && !this.props.hasWinner) {
            this.setState(state => {
                const values = Range(0, 9).map(num => num === index ? this.props.currentPlayer : state.values[num]).toArray();
                this.props.updateGameState(row, col, values);
                return { values: values };
            });
        }
    }

    render() {
        return (
            <>
            {
                Range(0, 3).map(row => { 
                    return (
                        <div key={row.toString()} className="row">
                        {
                            Range(0, 3).map(col => {
                                const index = calculateIndex(row, col);
                                return <Box key={index.toString()} row={row} col={col} onClick={this.handleClick} currentPlayer={this.state.values[index]}/>;
                            })
                        }
                        </div>
                    );
                })
            }
            </>
        );
    }  
}

export default Board;
