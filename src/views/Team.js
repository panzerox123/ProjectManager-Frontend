import React from 'react';
import { Button, Container, Jumbotron } from 'react-bootstrap';
import Task from './Tasks'
import { teamData } from '../services/Teams';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import {createMainTask} from '../services/Task'

class Team extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teamName: "",
            teamNumber: "",
            tasks: []
        }
        this.maintask_ref = null;
        this.create_maintask = this.create_maintask.bind(this);
        this.get_details = this.get_details.bind(this)
        this.del_refresh = this.del_refresh.bind(this);
    }

    async get_details(){
        let res = await teamData(this.props.match.params.teamNumber);
        this.setState({ teamName: res.teamName, teamNumber: res.teamNumber ,tasks: res.tasks})
    }
    
    async componentDidMount() {
        await this.get_details();
    }

    async create_maintask(){
        let data = this.maintask_ref.value;
        //console.log(data);
        let r = await createMainTask(data, this.props.match.params.teamNumber);
        if(r) this.get_details();
    }

    async del_refresh(){
        await this.get_details();
    }

    render() {
        //return (<h1>Hello {this.props.match.params.teamNumber}</h1>);
        return (
            <Container>
                <Jumbotron>
                    <h3>{this.state.teamName}</h3>
                    <h5>{this.state.teamNumber}</h5>
                    <br></br>
                    <InputGroup className="mb-3">
                        <FormControl
                        type="text"
                        placeholder="Task name"
                        ref = {(el) => {this.maintask_ref = el}}
                        >
                        </FormControl>
                    </InputGroup>
                    <Button variant="success" onClick={this.create_maintask}>Create a new Task</Button>
                </Jumbotron>
                {this.state.tasks.map(data=><Task teamNumber={this.state.teamNumber} taskID={data} key={data} del_refresh={this.del_refresh}></Task>)}
            </Container>
        );
    }
}

export default Team