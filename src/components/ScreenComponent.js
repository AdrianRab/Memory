import React from 'react';
import { Segment, Grid, Button, Icon, Label, Dropdown, Modal } from 'semantic-ui-react';
import TileComponent from './TileComponent';
import Confetti from './../common/Confetti'

const ScreenComponent = ({ moves, difficultyOptions, difficultyLevel, handleOnChange, restartGame, rowsNumber, shuffledImages,
    cover, updateChild, handleMoves, open, openModal, countCoveredCards, coveredCards, playOnNextLevel }) => {

    if (coveredCards === 0) {
        openModal();
    }
    const createGrid = () => {
        let grid = []
        let imageNumber = 0;

        for (let i = 0; i < rowsNumber; i++) {
            let children = []

            for (let j = 0; j < 4; j++) {
                children.push(<Grid.Column width="4" key={imageNumber}>
                    <TileComponent image={shuffledImages[imageNumber]}
                        label={cover}
                        countMoves={handleMoves}
                        update={updateChild}
                        countCoveredCards={countCoveredCards}
                    />
                </Grid.Column>)
                imageNumber++;
            }

            grid.push(<Grid.Row key={i}>{children}</Grid.Row>)
        }
        return grid
    };

    return (
        <div className="screen-component">
            {open ? <Confetti /> : null}
            <Segment raised >
                <Grid verticalAlign="middle" >
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Label size="massive" color='teal'>Number of moves:
                                    <Label.Detail>{moves}</Label.Detail>
                            </Label>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Dropdown options={difficultyOptions}
                                selection button
                                floating labeled
                                icon='filter'
                                className='icon'
                                onChange={handleOnChange}
                                value={difficultyLevel}
                            />
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
                    <Button.Content visible>Restart</Button.Content>
                    <Button.Content hidden>
                        <Icon name='redo' />
                    </Button.Content>
                </Button>
            </Segment>

            <Modal dimmer='inverted' open={open} closeOnDimmerClick={false} closeOnEscape={false} size='small'>
                <Modal.Header>Congratulations! <Icon name='winner' color='yellow' /></Modal.Header>
                <Modal.Content >
                    {difficultyLevel !== 10 ?
                        <Modal.Description>
                            <p className='modal-info'>You have finished game in {moves} moves.</p>
                            <p className='modal-info'>Would you like to play again, or level up?</p>
                        </Modal.Description>
                        :
                        <Modal.Description>
                            <p className='modal-info'>You have finished highest game level in {moves} moves.</p>
                        </Modal.Description>
                    }
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        disabled={difficultyLevel === 10}
                        color='vk'
                        icon='arrow circle right'
                        labelPosition='right'
                        onClick={playOnNextLevel}
                        content="Next level"
                    />
                    <Button
                        positive
                        icon='redo'
                        labelPosition='right'
                        content="Play again"
                        onClick={restartGame}
                    />
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default ScreenComponent;