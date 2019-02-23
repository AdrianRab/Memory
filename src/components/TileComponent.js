import React, { Component } from 'react';
import { Segment, Reveal, Image } from 'semantic-ui-react';

class TileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.props.image,
            visibleCover: true,
            visibleImage: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        console.log("cliked " + event.target);
        this.setState({
            visibleCover: !this.state.visibleCover,
            visibleImage: !this.state.visibleImage
        })
    }

    render() {
        return (

            <Segment raised onClick={this.handleClick}>
                <Reveal>
                    <Reveal.Content visible={this.state.visibleCover} hidden={this.state.visibleImage}>
                        <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' />
                    </Reveal.Content>
                    <Reveal.Content visible={this.state.visibleImage} hidden={this.state.visibleCover}>
                        {this.props.image}
                    </Reveal.Content>
                </Reveal>
            </Segment>
        );
    }
}


export default TileComponent;