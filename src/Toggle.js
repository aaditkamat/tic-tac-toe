import React from 'react';

const Toggle = (props) => {
    const handleClick = () => {
        props.sortMoves();
    }

    return (
        <div className="col">
        <button onClick={handleClick}>{props.isAscending ? 'Ascending' : 'Descending'}</button>
        </div>
    );
}

export default Toggle;