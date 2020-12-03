import React from 'react'
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap'
import { getTaskDetails, createSubTask, renameTask } from '../services/Task'

class SubTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: "",
            parent_task: "",
            children: [],
            show_add: false,
            display_sub: false,
            show_rename: false
        }
        this.subtask_ref = null;
        this.rename_ref = null;
        this.showAdd = this.showAdd.bind(this)
        this.create_sub_task = this.create_sub_task.bind(this);
        this.generate_Sub_Task = this.generate_Sub_Task.bind(this);
        this.displaySub = this.displaySub.bind(this)
        this.showRename = this.showRename.bind(this)
        this.rename_task = this.rename_task.bind(this)
    }
    async componentDidMount() {
        let res = await getTaskDetails(this.props.teamNumber, this.props.taskID);
        this.setState({ taskName: res.taskName, parent_task: res.parent_task, children: res.children })
    }
    showAdd() {
        this.setState((prev)=>({show_add : !prev.show_add}))
    }

    showRename(){
        this.setState((prev)=>({show_rename : !prev.show_rename}))
    }

    displaySub() {
        this.setState((prev)=>({display_sub: !prev.display_sub}))
    }

    async create_sub_task() {
        var data = this.subtask_ref.value;
        let r = await createSubTask(data, this.props.teamNumber, this.props.taskID);
        if (r) window.location.reload();
    }

    generate_Sub_Task(data) {
        return (
            <SubTask teamNumber={this.props.teamNumber} taskID={data} pad={this.props.pad + 20} key={data} />
        );
    }

    async rename_task(){
        var data = this.rename_ref.value;
        let r = await renameTask(data,this.props.teamNumber,this.props.taskID);
        console.log(r);
        if(r) this.setState({taskName:data});
    }


    render() {
        return (
            <div>
                <Card style={{ marginBottom: '20px', marginLeft: this.props.pad}}>
                    <Card.Body>
                        <Card.Title>
                            {this.state.taskName}
                        </Card.Title>
                        <Button variant="success" onClick={this.showAdd}>Add Subtask</Button>
                        <Button onClick={this.showRename} style={{marginLeft:'20px'}}>Rename</Button>
                        <Button variant="danger" style={{ margin: '20px' }}>Delete Subtask</Button>
                        <Button onClick={this.displaySub} style={{display: this.state.children.length == 0? "none":"inline"}}>Show subtasks</Button>
                    </Card.Body>
                    <Card.Footer style={{ display: this.state.show_add ? "block" : "none" }}>
                        <InputGroup>
                            <FormControl
                                style={{ margin: '20px' }}
                                type="text"
                                placeholder="Add a subtask"
                                ref={(el) => { this.subtask_ref = el }}
                            >
                            </FormControl>
                        </InputGroup>
                        <Button variant="success" style={{ marginLeft: '20px' }} onClick={this.create_sub_task}>Add</Button>
                    </Card.Footer>
                    <Card.Footer style={{display: this.state.show_rename?"block":"none"}}>
                        <InputGroup>
                        <FormControl
                            style={{margin:'20px'}}
                            type="text"
                            placeholder="New name"
                            ref = {(el) => {this.rename_ref = el}}
                        >
                        </FormControl>
                        </InputGroup>
                        <Button variant="success" style={{marginLeft:'20px'}} onClick={this.rename_task}>Rename</Button> 
                    </Card.Footer>
                </Card>
                <div style={{ display: this.state.display_sub ? "block" : "none" }}>
                    {this.state.children.map(data => this.generate_Sub_Task(data))}
                </div>            
                </div>
        );
    }
}

export default SubTask