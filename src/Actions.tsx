import { Range } from "immutable";
import React, { Component } from "react";
import Action from "./Action";
import "./Actions.css";

class Actions extends Component<Actions.Props, Actions.State> {
    constructor(props: Actions.Props) {
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
        let start: number = 0;
        let end: number = this.props.moves.length;
        let step: number = 1;
        if (!this.props.movesAreSortedInAscending) {
            start = this.props.moves.length - 1;
            end = -1;
            step = -1;
        }
        return Range(start, end, step).map((num: number) => {
            let moveLabel: string = `move #${num}: ${this.props.moves[num]}`;
            if (this.props.moves[num] === "") {
                moveLabel = "game start";
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
                    { this.renderActions() }
                </ol>
            </div>
        );
    }
}

export default Actions;
