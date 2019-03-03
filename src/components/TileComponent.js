import React, { Component } from 'react';
import { Transition, Card } from 'semantic-ui-react';

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
        this.openCardAndUpdateMoves();
        this.checkIfSame();
    };

    checkIfSame = () => {
        this.preventOpeningMoreThan2();
        if (openedCards.length === 2) {
            if (openedCards[0].props.image === openedCards[1].props.image) {
                openedCards = [];
                this.props.countCoveredCards();
            } else {
                this.timeout = setTimeout(() => {
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
    };

    componentWillReceiveProps() {
        if (this.props.update) {
            this.setState({
                visibleImage: false,
                visibleCover: true
            })
            numberOfMoves = 0;
        }
    };

    openCardAndUpdateMoves = () => {
        openedCards.push(this);
        var len = openedCards.length;
        if (len === 2) {
            numberOfMoves++
            this.props.countMoves(numberOfMoves);
        }
    };

    preventOpeningMoreThan2 = () => {
        if (openedCards.length > 2) {
            this.setState({
                visibleImage: false,
                visibleCover: true
            })
        }
    };

    render() {
        return (
            <Transition.Group as={Card} animation="shake" >
                {this.state.visibleImage ? <Card color='olive' raised fluid centered image={this.props.image} /> :
                    <Card color='yellow' raised fluid centered image={this.props.label} onClick={this.handleClick} />}
            </Transition.Group>
        );
    }
}

let openedCards = [];
let numberOfMoves = 0;

export default TileComponent;