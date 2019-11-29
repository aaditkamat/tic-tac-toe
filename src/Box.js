import React from 'react';
import './Box.css';

const Box = (props) => {
    return <div className="box" onClick={() => props.onClick(props.row, props.col)}>{props.currentPlayer}</div>;
}

export default Box;