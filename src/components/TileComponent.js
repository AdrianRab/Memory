import React, { Component } from 'react';
import { Segment, Transition, Card } from 'semantic-ui-react';

class TileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleImage: false,
            visibleCover: true
        };
    }

    handleClick = (event) => {
        this.setState({
            visibleImage: !this.state.visibleImage,
            visibleCover: !this.state.visibleCover
        });
        console.log(openedCards)
        this.cardOpen();
        this.checkIfSame();
    }

    checkIfSame = () => {
        this.preventOpeningMoreThan2();
        if (openedCards.length === 2) {
            console.log(openedCards[0].props.image);
            console.log(openedCards[1].props.image);
            if (openedCards[0].props.image === openedCards[1].props.image) {
                console.log("wartosci sie rownaja")
                openedCards = [];
            } else {
                console.log("wartosci sie nie rownaja");
                this.timeout = setTimeout(() => {
                    console.log(openedCards)
                    this.setState({
                        visibleImage: !this.state.visibleImage,
                        visibleCover: !this.state.visibleCover
                    });
                    if (openedCards[0] !== undefined) {
                        openedCards[0].setState({
                            visibleCover: true,
                            visibleImage: false
                        });
                    }
                    openedCards = [];
                }, 700)

            }
        }
    }

    cardOpen = () => {
        openedCards.push(this);
        var len = openedCards.length;
        if (len === 2) {
            numberOfMoves++
            //TODO counter nie dziala
            this.props.countMoves(numberOfMoves);
            console.log(numberOfMoves);
        }
    };

    preventOpeningMoreThan2 = () => {
        if (openedCards.length === 3) {
            this.setState({
                visibleImage: false,
                visibleCover: true
            })
        }
    };

    render() {
        return (
            <Segment raised compact textAlign="center">
                <Transition.Group as={Card} duration={500} size='huge' animation="shake" id={this.props.image}>
                    {this.state.visibleImage ? <Card fluid centered header={this.props.image} /> :
                        <Card fluid centered header={this.props.label} onClick={this.handleClick} className="card" />}
                </Transition.Group>
            </Segment>
        );
    }
}

let numberOfMoves = 0;
let openedCards = [];

export default TileComponent;