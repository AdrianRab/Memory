
import React, { Component } from 'react';
import { Segment, Grid, Button, Transition, Divider, Image } from 'semantic-ui-react';
import TileComponent from './TileComponent';

class ScreenComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [1, 2, 3, 4, 5, 6],
            rowsNumber: 3,
            visible: true,
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
                children.push(<Grid.Column width="4"><TileComponent image={imageNumber} /></Grid.Column>)
                imageNumber++;
            }
            //Create the parent and add the children
            grid.push(<Grid.Row>{children}</Grid.Row>)
        }
        return grid
    }

    prepareImages = () => {
        let imgs = this.state.images;
        imgs.push(imgs);
        shuffle(imgs);
        return imgs;
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        const { visible } = this.state
        return (
            <Segment raised color="teal">
                <Grid>
                    {this.createGrid()}
                </Grid>
                <Divider hidden />
                <span onClick={this.toggleVisibility}>
                    <Transition visible={visible} animation='scale' duration={500}>
                        <Image size='small' src='https://react.semantic-ui.com/images/leaves/1.png' />
                    </Transition>
                </span>
                <Button secondary content={visible ? 'Hide' : 'Show'} onClick={this.toggleVisibility} />
            </Segment>
        );
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export default ScreenComponent;