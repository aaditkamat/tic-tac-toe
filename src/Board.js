import React from 'react';
import { Range } from 'immutable';
import Box from './Box';
import { calculateIndex } from './extra'; 
import './Board.css';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: props.values
        }
    }

    render() {
        return (
            <>
            <div className="row">
                <div className="header first">1</div>
                {Range(2, 4).map(num => <div className="header">{num}</div>)}
            </div>
            {
                Range(0, 3).map(row => { 
                    return (
                        <div key={row.toString()} className="row">
                        { <div className="number-column">{row + 1}</div> }
                        {
                            Range(0, 3).map(col => {
                                const index = calculateIndex(row, col);
                                return <Box key={index.toString()} row={row} col={col} handleClick={this.props.updateGameState} currentPlayer={this.props.values[index]}/>;
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
