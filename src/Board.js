import React from 'react';
import { Range } from 'immutable';
import Box from './Box';
import { calculateIndex } from './extra'; 

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: props.values
        }
    }

    handleClick() {
        
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
