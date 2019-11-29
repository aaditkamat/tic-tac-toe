import React from 'react';
import { Range } from 'immutable';
import './Actions.css';

const Actions = (props) => (
    <div className="row">
        <ol>
            { Range(0, props.noOfMoves).map(num => {
                let moveLabel = `move #${num}`;
                if (num === 0) {
                    moveLabel = 'game start';
                }
                return (
                    <li key={num.toString()} >
                        <button onClick={() => props.goToMove(num)}>
                            {`Go to ${moveLabel}`}
                        </button>
                    </li>
                );
              })
            } 
        </ol>
    </div>
);

export default Actions;