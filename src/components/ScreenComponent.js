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
import cover from './../resources/memo-cover.png';
import pyramid from './../resources/pyramid.jpg';

class ScreenComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowsNumber: 3,
            shuffledImages: [],
            moves: 0,
            updateChild : false
        };
    };

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
       
        for (let i = 0; i < this.state.rowsNumber; i++) {
            let children = []
            
            for (let j = 0; j < 4; j++) {
                children.push(<Grid.Column width="4" key={imageNumber}>
                    <TileComponent image={this.state.shuffledImages[imageNumber]} label={cover} countMoves={this.handleMoves} update={this.state.updateChild}/>
                </Grid.Column>)
                imageNumber++;
            }
            
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

    images = [acropolis, ancientTheatre, castle, colosseum, ruin, pyramid, temple, pontDuGard, parthenon, neuschwanstein];

    prepareImages = () => {
        shuffle(this.images);
        let imgs = this.images.slice(0, this.difficultyLevel);
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
            updateChild: true
        })
        this.timeout = setTimeout(() => {
            this.setState({
                updateChild: false
            })
            this.forceUpdate();
        }, 1000)
    };

    onChange = (e, { value }) => {
        this.difficultyLevel = value;
        this.setState({
            rowsNumber: value/2,
            moves: 0,
            updateChild: true
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
            <div className="screen-component">
                <Segment raised > 
                    <Grid verticalAlign="middle" >
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Label size="massive" color='teal'>Number of moves:
                                    <Label.Detail>{this.state.moves}</Label.Detail>
                                </Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Dropdown options={this.options} selection button defaultValue={this.difficultyLevel} floating labeled icon='filter' className='icon' onChange={this.onChange} />
                                <Label size="big" color='teal' tag>Difficulty level</Label>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment raised color="teal"> 
                    <Grid container verticalAlign="middle" columns={4}>
                        {this.createGrid()}
                    </Grid>
                    <br />
                    <Button animated="vertical" onClick={this.restartGame} primary>
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