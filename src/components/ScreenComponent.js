import React from 'react';
import { Segment, Grid, Button, Icon, Label, Dropdown, Modal, Flag } from 'semantic-ui-react';
import TileComponent from './TileComponent';
import Confetti from './../common/Confetti';
import { Trans } from 'react-i18next';

const ScreenComponent = ({ moves, difficultyLevel, onDifficultyLevelChange, restartGame, rowsNumber, shuffledImages,
    cover, updateChild, handleMoves, open, openModal, countCoveredCards, coveredCards, playOnNextLevel, t, i18n,
    onCategoryChange, categoryName }) => {

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

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="screen-component">
            {open ? <Confetti /> : null}
            <Segment raised >
                <Grid verticalAlign="middle" >
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Label size="huge" color='teal'>{t('Number of moves')}:
                                    <Label.Detail>{moves}</Label.Detail>
                            </Label>
                        </Grid.Column>
                        <Grid.Column width={4}>
                        <Label size="big" color='violet'>{t('Category')}</Label>
                            <Dropdown options={[
                                { key: 1, text: t('Monuments'), value: 'monuments' },
                                { key: 2, text: t('Monuments') + ' 2', value: 'monuments2' },
                                { key: 3, text: t('Sport'), value: 'sport' },
                                { key: 4, text: t('Landscapes'), value: 'landscapes' },
                                { key: 5, text: t('Animals'), value: 'animals' },
                                { key: 6, text: t('Motorisation'), value: 'motorisation' }
                            ]}
                                selection button
                                floating labeled
                                icon='filter'
                                className='icon'
                                onChange={onCategoryChange}
                                value={categoryName}
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                        <Label size="big" color='violet'>{t('Difficulty level')}</Label>
                            <Dropdown options={[
                                { key: 1, text: t('Level') + ' 1', value: 6 },
                                { key: 2, text: t('Level') + ' 2', value: 8 },
                                { key: 3, text: t('Level') + ' 3', value: 10 }
                            ]}
                                selection button
                                floating labeled
                                icon='filter'
                                className='icon'
                                onChange={onDifficultyLevelChange}
                                value={difficultyLevel}
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Flag name='pl' onClick={() => changeLanguage('pl')} />
                            <Flag name='gb' onClick={() => changeLanguage('en')} />
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
                    <Button.Content visible>{t('Restart')}</Button.Content>
                    <Button.Content hidden>
                        <Icon name='redo' />
                    </Button.Content>
                </Button>
            </Segment>

            <Modal dimmer='inverted' open={open} closeOnDimmerClick={false} closeOnEscape={false} size='small'>
                <Modal.Header><Trans i18nKey='congratulations'>Congratulations</Trans>! <Icon name='winner' color='yellow' /></Modal.Header>
                <Modal.Content >
                    {difficultyLevel !== 10 ?
                        <Modal.Description>
                            <Trans i18nKey="gameSummary" moves={moves}>
                                <p className='modal-info'>You have finished game in <strong>{{ moves }}</strong> moves. Would you like to play again, or level up?</p>
                            </Trans>
                        </Modal.Description>
                        :
                        <Modal.Description>
                            <Trans i18nKey="highestLevelGameSummary" moves={moves}>
                                <p className='modal-info'>You have finished highest game level in <strong>{{ moves }}</strong> moves.</p>
                            </Trans>
                        </Modal.Description>
                    }
                </Modal.Content>
                <Modal.Actions>
                    {difficultyLevel !== 10 ?
                        <Button
                            color='vk'
                            icon='arrow circle right'
                            labelPosition='right'
                            onClick={playOnNextLevel}
                            content={t('Next level')}
                        /> :
                        null}
                    <Button
                        positive
                        icon='redo'
                        labelPosition='right'
                        content={t('Play again')}
                        onClick={restartGame}
                    />
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default ScreenComponent;