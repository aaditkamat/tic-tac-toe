import React, { Component } from 'react';
import { Range } from 'immutable';
import Action from './Action';
import './Actions.css';

class Actions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: -1
        }
        this.handleClick = this.handleClick.bind(this);
        this.renderActions = this.renderActions.bind(this);
    }

    handleClick(num) {
        this.setState({ selectedIndex: num });
        this.props.goToMove(num);
    }

    renderActions() {
        let start = 0, end = this.props.moves.length, step = 1;
        if (!this.props.movesAreSortedInAscending) {
            start = this.props.moves.length - 1;
            end = -1;
            step =-1;
        }
        return Range(start, end, step).map(num => {
            let moveLabel = `move #${num}: ${this.props.moves[num]}`;
            if (this.props.moves[num] === '') {
                moveLabel = 'game start';
            }
            return <Action key={num.toString()} textisBold={num === this.state.selectedIndex} moveLabel={moveLabel} handleClick={() => this.handleClick(num)}/>;
        });
    }

    render() {
        return (
            <div className="col">
                <ol>
                    { 
                        this.renderActions()
                    } 
                </ol>
            </div>
        );
    }
}

export default Actions;