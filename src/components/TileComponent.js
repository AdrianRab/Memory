import React, { Component } from 'react';
import { Transition, Card } from 'semantic-ui-react';
import './Style.css';

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
        this.openCardAndUpdateMoves();
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
                }, 1000)

            }
        }
    }

    openCardAndUpdateMoves = () => {
        openedCards.push(this);
        var len = openedCards.length;
        if (len === 2) {
            numberOfMoves++
            this.props.countMoves(numberOfMoves);
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
                <Transition.Group as={Card} animation="shake" >
                    {this.state.visibleImage ? <Card color='olive' raised fluid centered image={this.props.image}  /> :
                        <Card color='yellow' raised fluid centered image={this.props.label} onClick={this.handleClick} />}
                </Transition.Group>
        );
    }
}

let numberOfMoves = 0;
let openedCards = [];

export default TileComponent;