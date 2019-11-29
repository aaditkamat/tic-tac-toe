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
    }

    handleClick(num) {
        this.setState({ selectedIndex: num });
        this.props.goToMove(num);
    }

    render() {
        return (
            <div className="row">
                <ol>
                    { 
                        Range(0, this.props.moves.length).map(num => {
                            let moveLabel = `move #${num}: ${this.props.moves[num]}`;
                            if (num === 0) {
                                moveLabel = 'game start';
                            }
                            return <Action key={num.toString()} textisBold={num === this.state.selectedIndex} moveLabel={moveLabel} handleClick={() => this.handleClick(num)}/>;
                        })
                    } 
                </ol>
            </div>
        );
    }
}

export default Actions;