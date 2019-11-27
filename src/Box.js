import React from 'react';
import './Box.css';

const Box = (props) => {
    return <div className="box" onClick={() => props.onClick(props.index)}>{props.currentPlayer}</div>;
}

export default Box;