import { Range } from "immutable";
import React, { Component } from "react";
import Action from "./Action";
import "./Actions.css";

class Actions extends Component<Action.Props, Action.State> {
    constructor(props: Action.Props) {
        super(props);
        this.state = {
            selectedIndex: -1,
        };
        this.handleClick = this.handleClick.bind(this);
        this.renderActions = this.renderActions.bind(this);
    }

    public handleClick(num: number) {
        this.setState({ selectedIndex: num });
        this.props.goToMove(num);
    }

    public renderActions() {
        let start = 0;
        let end = this.props.moves.length;
        let step = 1;
        if (!this.props.movesAreSortedInAscending) {
            start = this.props.moves.length - 1;
            end = -1;
            step =-1;
        }
        return Range(start, end, step).map(num => {
            let moveLabel = `move #${num}: ${this.props.moves[num]}`;
            if (this.props.moves[num] === "") {
                moveLabel = 'game start';
            }
            return <Action key={num.toString()} 
                           textisBold={num === this.state.selectedIndex} 
                           moveLabel={moveLabel} 
                           handleClick={() => this.handleClick(num)} />;
        });
    }

    public render() {
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