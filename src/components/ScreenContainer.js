import React from 'react';
import ScreenComponent from './ScreenComponent';
import { shuffle } from '../util/functions';
import acropolis from './../resources/acropolis.jpg';
import ancientTheatre from './../resources/ancient-theatre.jpg';
import colosseum from './../resources/colosseum.jpg';
import castle from './../resources/castle.jpg';
import neuschwanstein from './../resources/neuschwanstein.jpg';
import parthenon from './../resources/parthenon.jpg';
import pontDuGard from './../resources/pont-du-gard.jpg';
import ruin from './../resources/ruin.jpg';
import temple from './../resources/temple.jpg';
import cover from './../resources/memo-cover.png';
import pyramid from './../resources/pyramid.jpg';

class ScreenContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowsNumber: 3,
            shuffledImages: [],
            moves: 0,
            updateChild: false,
            open: false,
            coveredCards: this.difficultyLevel,
            level: this.difficultyLevel
        };
    };

    openModal = () => {
        this.setState({
            open: true,
            coveredCards: this.difficultyLevel
        })
    };

    closeModal = () => {
        this.setState({
            open: false
        })
    };

    handleMoves = (numberOfMoves) => {
        this.setState({
            moves: numberOfMoves
        })
    };

    countCoveredCards = () => {
        this.setState({
            coveredCards: this.state.coveredCards - 1
        })
    }

    componentDidMount() {
        this.setState({
            shuffledImages: this.prepareImages()
        })
    };

    options = [
        { key: 1, text: 'Level 1', value: 6 },
        { key: 2, text: 'Level 2', value: 8 },
        { key: 3, text: 'Level 3', value: 10 },
    ];

    difficultyLevel = 6;

    images = [acropolis, ancientTheatre, castle, colosseum, ruin, pyramid, temple, pontDuGard, parthenon, neuschwanstein];

    prepareImages = () => {
        shuffle(this.images);
        let imgs = this.images.slice(0, this.state.level);
        let tempTable = imgs;
        tempTable.forEach(element => {
            imgs.push(element);
        });
        shuffle(imgs);
        return imgs;
    };

    restartGame = () => {
        this.setState({
            moves: 0,
            updateChild: true,
            open: false
        })
        this.timeout = setTimeout(() => {
            this.setState({
                updateChild: false
            })
            this.forceUpdate();
        }, 1000)
    };

    playOnNextLevel = () => {
        if (this.state.level < 10) {
            this.setState({
                updateChild: true,
                level: this.state.level + 2,
                coveredCards: this.state.coveredCards + 2,
                open: false
            })
            this.timeout = setTimeout(() => {
                this.setState({
                    moves: 0,
                    rowsNumber: this.state.rowsNumber + 1,
                    shuffledImages: this.prepareImages(),
                    updateChild: false
                })
            }, 500)
            this.difficultyLevel = this.difficultyLevel + 2;
        }
    };

    onChange = (e, { value }) => {
        this.difficultyLevel = value;
        this.setState({
            rowsNumber: value / 2,
            moves: 0,
            updateChild: true,
            coveredCards: value,
            level: value
        })
        this.timeout = setTimeout(() => {
            this.setState({
                shuffledImages: this.prepareImages(),
                updateChild: false
            })
        }, 500)
    };

    render() {
        return (
            <ScreenComponent
                rowsNumber={this.state.rowsNumber}
                moves={this.state.moves}
                difficultyOptions={this.options}
                difficultyLevel={this.state.level}
                handleOnChange={this.onChange}
                restartGame={this.restartGame}
                shuffledImages={this.state.shuffledImages}
                cover={cover}
                updateChild={this.state.updateChild}
                handleMoves={this.handleMoves}
                open={this.state.open}
                openModal={this.openModal}
                countCoveredCards={this.countCoveredCards}
                coveredCards={this.state.coveredCards}
                playOnNextLevel={this.playOnNextLevel}
            />
        )
    }

}

export default ScreenContainer;