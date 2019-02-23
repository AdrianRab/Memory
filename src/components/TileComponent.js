import React, { Component } from 'react';
import { Segment, Reveal, Image } from 'semantic-ui-react';

class TileComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            image:this.props.image,
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event){
        console.log("cliked " + event.target);
    }

    render(){
        return(

            <Segment raised onClick={this.handleClick}>
                {/* <Reveal animated='move'>
                    <Reveal.Content visible>
                        <p>MEMORY</p>
                    </Reveal.Content>
                    <Reveal.Content hidden>
                        <p>{this.state.image}</p>
                    </Reveal.Content>
                </Reveal> */}
                  <Reveal animated='move'>
                    <Reveal.Content visible>
                        <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' />
                    </Reveal.Content>
                    <Reveal.Content hidden>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/chris.jpg' size='small' />
                    </Reveal.Content>
                </Reveal>
           </Segment>
        );
    }
}


export default TileComponent;