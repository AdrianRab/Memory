import React from 'react';
import ScreenComponent from './ScreenComponent';
import { shuffle } from '../util/functions';
import cover from './../resources/memo-cover.png';
import { translate } from 'react-i18next';

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

    difficultyLevel = 6;

    importAll(r) {
        return r.keys().map(r);
    }

    images = this.importAll(require.context('./../resources/monuments', false, /\.(png|jpe?g|svg)$/));

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
            open: false,
            coveredCards: this.state.level
        })
        this.timeout = setTimeout(() => {
            this.setState({
                updateChild: false,
                shuffledImages: this.prepareImages()
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
        const { t, i18n } = this.props;

        return (
            <ScreenComponent
                rowsNumber={this.state.rowsNumber}
                moves={this.state.moves}
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
                t={t}
                i18n={i18n}
            />
        )
    }

}

export default translate('translations')(ScreenContainer);