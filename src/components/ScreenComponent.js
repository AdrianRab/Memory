
import React, { Component } from 'react';
import { Segment, Grid, Button, Icon } from 'semantic-ui-react';
import TileComponent from './TileComponent';

class ScreenComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [1, 2, 3, 4, 5, 6],
            rowsNumber: 3,
            visible: true,
            label: "MEMORY"
        };
    }

    createGrid = () => {
        let grid = []
        let imageNumber = 0;
        let imgs = this.prepareImages();
        // Outer loop to create parent
        for (let i = 0; i < this.state.rowsNumber; i++) {
            let children = []
            //Inner loop to create children
            for (let j = 0; j < 4; j++) {
                children.push(<Grid.Column width="4" key={imageNumber}><TileComponent image={imgs[imageNumber]} label={this.state.label} /></Grid.Column>)
                imageNumber++;
            }
            //Create the parent and add the children
            grid.push(<Grid.Row key={i}>{children}</Grid.Row>)
        }
        return grid
    }

    prepareImages = () => {
        let imgs = this.state.images;
        this.state.images.forEach(element => {
            imgs.push(element);
        });
        shuffle(imgs);
        return imgs;
    }

    restartGame = () => {
        this.forceUpdate();
        console.log("apply logic")
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        console.log(card)
        return (
            <div>
                <br/>
                <Segment raised color="teal" >
                    <Grid>
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
}

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
}

let card = document.getElementsByClassName("card");
// let cards = [...card];

export default ScreenComponent;