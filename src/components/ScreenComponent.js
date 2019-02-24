
import React, { Component } from 'react';
import { Segment, Grid, Button, Icon, Label, Dropdown } from 'semantic-ui-react';
import TileComponent from './TileComponent';
import acropolis from './../resources/acropolis.jpg';
import ancientTheatre from './../resources/ancient-theatre.jpg';
import colosseum from './../resources/colosseum.jpg';
import castle from './../resources/castle.jpg';
import neuschwanstein from './../resources/neuschwanstein.jpg';
import parthenon from './../resources/parthenon.jpg';
import pontDuGard from './../resources/pont-du-gard.jpg';
import ruin from './../resources/ruin.jpg';
import temple from './../resources/temple.jpg';
import whitbyAbbey2 from './../resources/whitby-abbey.jpg';
import cover from './../resources/memo-cover.png';
// import tower from './../resources/tower.jpg';
// import whitbyAbbey1 from './../resources/whitby-abbey-dark.jpg';
// import sanGalgano from './../resources/san-galgano.jpg';
// import pyramid from './../resources/pyramid.jpg';
// import pierre from './../resources/pierre.jpg';
// import china from './../resources/china.jpg';
// import colosseumInside from './../resources/colosseum-inside.jpg';
// import mexico from './../resources/mexico.jpg';

class ScreenComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [acropolis, ancientTheatre, castle, colosseum, ruin, whitbyAbbey2, temple, pontDuGard, parthenon, neuschwanstein],
            rowsNumber: 3,
            label: cover,
            shuffledImages: [],
            moves: 0
        };
    }


    handleMoves = (numberOfMoves) => {
        this.setState({
            moves: numberOfMoves
        })
    };

    componentDidMount() {
        this.setState({
            shuffledImages: this.prepareImages()
        })
    };

    createGrid = () => {
        let grid = []
        let imageNumber = 0;
        // Outer loop to create parent
        for (let i = 0; i < this.state.rowsNumber; i++) {
            let children = []
            //Inner loop to create children
            for (let j = 0; j < 4; j++) {
                children.push(<Grid.Column width="4" key={imageNumber}>
                    <TileComponent image={this.state.shuffledImages[imageNumber]} label={this.state.label} countMoves={this.handleMoves} />
                </Grid.Column>)
                imageNumber++;
            }
            //Create the parent and add the children
            grid.push(<Grid.Row key={i}>{children}</Grid.Row>)
        }
        return grid
    };

    options = [
        { key: 1, text: 'Level 1', value: 6 },
        { key: 2, text: 'Level 2', value: 8 },
        { key: 3, text: 'Level 3', value: 10 },
    ];

    difficultyLevel = 6;

    prepareImages = () => {
        let imgs = this.state.images.slice(0, this.difficultyLevel);
        let tempTable = imgs;
        tempTable.forEach(element => {
            imgs.push(element);
        });
        shuffle(imgs);
        return imgs;
    };

    restartGame = () => {
        this.forceUpdate();
        //TODO tymczasowo
        window.location.reload();
        console.log("apply logic")
        this.setState({
            moves: 0
        })
    };

    onChange = (e, { value }) => {
        this.difficultyLevel = value;
        this.setState({
            shuffledImages: this.prepareImages(),
            rowsNumber: value/2,
            moves: 0
        })
    };

    render() {
        return (
            <div className="screen-component">
                <Segment raised>
                    <Grid verticalAlign="middle" >
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Label size="massive" color='teal'>Number of moves:
                                    <Label.Detail>{this.state.moves}</Label.Detail>
                                </Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Dropdown options={this.options} selection button defaultValue={this.difficultyLevel} floating labeled icon='filter' className='icon' onChange={this.onChange} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment raised color="teal" >
                    <Grid verticalAlign="middle" columns={4}>
                        {this.createGrid()}
                    </Grid>
                    <br />
                    <Button animated="vertical" onClick={this.restartGame}>
                        <Button.Content visible>Play again</Button.Content>
                        <Button.Content hidden>
                            <Icon name='redo' />
                        </Button.Content>
                    </Button>
                </Segment>
            </div>
        );
    }
};

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

export default ScreenComponent;