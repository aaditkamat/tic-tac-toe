import React from "react";
import "./Box.css";

const Box = (props: Box.Props) => {
    const style = props.isHighlighted ? {border: '2px solid black'} : {};
    return (
        <div className="box" 
                    style={style} 
                    onClick={() => props.handleClick(props.row, props.col)}>
        {props.currentPlayer}
        </div>
    );
};

export default Box;
