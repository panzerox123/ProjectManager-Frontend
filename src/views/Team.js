import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';

class Team extends React.Component{
    render(){
    //return (<h1>Hello {this.props.match.params.teamNumber}</h1>);
    return (
        <Container>
            <Jumbotron>
                <h3>{this.props.match.params.teamNumber}</h3>
            </Jumbotron>
        </Container>
    );
    }
}

export default Team