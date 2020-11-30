import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';

const {login} = require('../services/Auth');

class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            user: "",
            password: ""
        };
        this.userHandler = this.userHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    userHandler(ev){
        this.setState({user: ev.target.value});
    }

    passwordHandler(ev){
        this.setState({password: ev.target.value});
    }

    async submitHandler(){
        //console.log(this.state.email,this.state.password);
        await login(this.state);
        //window.location.href = '/';
    }

    render() {
        return (
            <Container>
                <Jumbotron>
                    <h1>Login</h1>
                    <h3>Enter your login details</h3>
                </Jumbotron>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            Username
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        type="text"
                        onChange={this.userHandler}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            Password
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        type="password"
                        onChange={this.passwordHandler}
                    />
                </InputGroup>
                <Button onClick={this.submitHandler}>Submit</Button>
            </Container>
        );
    }
}

export default Login