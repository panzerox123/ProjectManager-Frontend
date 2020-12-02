import React from 'react'
import { Card, InputGroup } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import { Route, Switch } from 'react-router-dom'
import FormControl from 'react'

const { getTeams } = require('../services/Teams')

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            teams: []
        }
    }

    generateList(data) {
        return (
            <Card className="text-center" key={data.teamNumber}>
                <Card.Body>
                <Card.Title><b>{data.teamName}</b></Card.Title>
                <Button variant="success">Open</Button>
                </Card.Body>
                <Card.Footer><b>Invite Code</b><br></br>{data.teamNumber}</Card.Footer>
            </Card>
        );
    }

    async componentDidMount() {
        let res = await getTeams();
        this.setState({ teams: res })
    }

    render() {
        return (
            <Container>
                <Jumbotron>
                    <h1>Your teams</h1>
                </Jumbotron>
                {this.state.teams.map(data=>this.generateList(data))}
            </Container>
        );
    }
}

export default Home;