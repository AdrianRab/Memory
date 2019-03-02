import React from 'react';
import { Segment, Grid, Button, Icon, Label, Dropdown } from 'semantic-ui-react';
import TileComponent from './TileComponent';

const ScreenComponent = ({ moves, difficultyOptions, difficultyLevel, handleOnChange, restartGame, rowsNumber, shuffledImages,
cover,updateChild, handleMoves}) => {

    console.log(difficultyOptions);
    console.log(difficultyLevel);
    console.log(rowsNumber);

    const createGrid = () => {
        let grid = []
        let imageNumber = 0;

        for (let i = 0; i < rowsNumber; i++) {
            let children = []

            for (let j = 0; j < 4; j++) {
                children.push(<Grid.Column width="4" key={imageNumber}>
                    <TileComponent image={shuffledImages[imageNumber]} label={cover} countMoves={handleMoves} update={updateChild} />
                </Grid.Column>)
                imageNumber++;
            }

            grid.push(<Grid.Row key={i}>{children}</Grid.Row>)
        }
        return grid
    };

    return (
        <div className="screen-component">
            <Segment raised >
                <Grid verticalAlign="middle" >
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Label size="massive" color='teal'>Number of moves:
                                    <Label.Detail>{moves}</Label.Detail>
                            </Label>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Dropdown options={difficultyOptions} selection button defaultValue={difficultyLevel} floating labeled icon='filter' className='icon' onChange={handleOnChange} />
                            <Label size="big" color='teal' tag>Difficulty level</Label>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Segment raised color="teal">
                <Grid container verticalAlign="middle" columns={4}>
                    {createGrid()}
                </Grid>
                <br />
                <Button animated="vertical" onClick={restartGame} primary>
                    <Button.Content visible>Play again</Button.Content>
                    <Button.Content hidden>
                        <Icon name='redo' />
                    </Button.Content>
                </Button>
            </Segment>
        </div>
    );
};

export default ScreenComponent;