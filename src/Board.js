import React from 'react';
import { Range } from 'immutable';
import Box from './Box';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: Range(0, 9).map(() => '').toArray()
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index) {
        this.setState(state => {
            const values = Range(0, 9).map(num => num === index ? this.props.currentPlayer : state.values[num]).toArray();
            return { values: values };
        });
        this.props.updatePlayer();
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
                                const index = 3 * row + col;
                                return <Box key={index.toString()} index={index} onClick={this.handleClick} currentPlayer={this.state.values[index]}/>;
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