import { Range } from "immutable";
import React from "react";
import "./Board.css";
import Box from "./Box";
import { calculateIndex, findInArray } from "./extra";

class Board extends React.Component<Board.Props> {
    constructor(props: Board.Props) {
        super(props);
        this.state = {
            values: props.values,
        };
    }

    public render() {
        return (
            <>
            <div className="row">
                <div className="header first">1</div>
                { Range(2, 4).map((num: number) => <div key={num.toString()} className="header">{num}</div>) }
            </div>
            {
                Range(0, 3).map((row: number) => {
                    return (
                        <div key={row.toString()} className="row">
                        { <div className="number-column">{row + 1}</div> }
                        {
                            Range(0, 3).map((col: number) => {
                                const index = calculateIndex(row, col);
                                return <Box key={index.toString()}
                                            isHighlighted={findInArray(index, this.props.highlightedSquares)}
                                            row={row}
                                            col={col}
                                            handleClick={this.props.updateGameState}
                                            currentPlayer={this.props.values[index]}/>;
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
