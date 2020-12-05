import React from 'react'
import { Button, ButtonGroup, Card, FormControl, InputGroup } from 'react-bootstrap'
import { getTaskDetails, createSubTask, deleteTask_main, renameTask, updateStatus } from '../services/Task'
import SubTask from './SubTask'

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: "",
            parent_task: "",
            status: 0,
            children: [],
            show_add: false,
            display_sub: false,
            show_rename: false,
        }
        this.subtask_ref = null;
        this.rename_ref = null;
        this.showAdd = this.showAdd.bind(this)
        this.create_sub_task = this.create_sub_task.bind(this);
        this.generate_Sub_Task = this.generate_Sub_Task.bind(this);
        this.displaySub = this.displaySub.bind(this);
        this.delete_task = this.delete_task.bind(this);
        this.showRename = this.showRename.bind(this)
        this.rename_task = this.rename_task.bind(this)
        this.update_status = this.update_status.bind(this)
        this.bg_color = this.bg_color.bind(this)
        this.text_color = this.text_color.bind(this)
        this.details_get = this.details_get.bind(this);
        this.del_refresh = this.del_refresh.bind(this)
    }

    async details_get(){
        let res = await getTaskDetails(this.props.teamNumber, this.props.taskID);
        this.setState({ taskName: res.taskName, parent_task: res.parent_task, children: res.children, status: res.taskStatus })
    }

    async componentDidMount() {
        await this.details_get();
    }

    showAdd() {
        this.setState((prev) => ({ show_add: !prev.show_add }))
    }
    showRename() {
        this.setState((prev) => ({ show_rename: !prev.show_rename }))
    }
    displaySub() {
        this.setState((prev) => ({ display_sub: !prev.display_sub }))
    }

    async update_status(st) {
        let r = updateStatus(st, this.props.teamNumber, this.props.taskID);
        if (r) this.setState({ status: st })
    }

    async create_sub_task() {
        var data = this.subtask_ref.value;
        let r = await createSubTask(data, this.props.teamNumber, this.props.taskID);
        if (r) {
            await this.details_get();
            this.showAdd();
        }
    }

    generate_Sub_Task(data) {
        return (
            <SubTask teamNumber={this.props.teamNumber} taskID={data} pad={40} key={data} del_refresh={this.del_refresh} />
        );
    }

    async rename_task() {
        var data = this.rename_ref.value;
        let r = await renameTask(data, this.props.teamNumber, this.props.taskID);
        if (r) await this.details_get();
    }

    async delete_task() {
        let r = await deleteTask_main(this.props.teamNumber, this.props.taskID);
        console.log(r)
        if (r) await this.props.del_refresh();
    }

    async del_refresh(){
        await this.details_get();
    }

    bg_color() {
        switch (this.state.status) {
            case 1:
                return "danger"
            case 2:
                return "warning"
            case 3:
                return "success"
            default:
                return "dark"
        }
    }

    text_color() {
        switch (this.state.status) {
            case 1:
                return "light"
            case 2:
                return "dark"
            case 3:
                return "light"
            default:
                return "light"
        }
    }

    render() {
        return (
            <div>
                <Card bg={this.bg_color()} text={this.text_color()} style={{ marginBottom: '20px' }}>
                    <Card.Body>
                        <Card.Title>
                            {this.state.taskName}
                        </Card.Title>
                        <ButtonGroup className="mb-2" style={{display: "block"}}>
                            <Button variant="dark" onClick={this.showAdd}>Add Subtask</Button>
                            <Button variant="dark" onClick={this.showRename}>Rename</Button>
                            <Button variant="dark" onClick={this.displaySub} style={{ display: this.state.children.length == 0 ? "none" : "inline" }}>Show subtasks</Button>
                            <Button variant="danger" onClick={this.delete_task}>Delete Task</Button>
                        </ButtonGroup>
                        <ButtonGroup className="mb-2" style={{display: "block"}}>
                            <Button variant="danger" onClick={() => this.update_status(1)}>Pending</Button>
                            <Button variant="warning" onClick={() => this.update_status(2)}>In Progress</Button>
                            <Button variant="success" onClick={() => this.update_status(3)}>Done</Button>
                        </ButtonGroup>
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

                    <Card.Footer style={{ display: this.state.show_rename ? "block" : "none" }}>
                        <InputGroup>
                            <FormControl
                                style={{ margin: '20px' }}
                                type="text"
                                placeholder="New name"
                                ref={(el) => { this.rename_ref = el }}
                            >
                            </FormControl>
                        </InputGroup>
                        <Button variant="success" style={{ marginLeft: '20px' }} onClick={this.rename_task}>Rename</Button>
                    </Card.Footer>
                </Card>
                <div style={{ display: this.state.display_sub ? "block" : "none" }}>
                    {this.state.children.map(data => this.generate_Sub_Task(data))}
                    <hr></hr>
                </div>
            </div>
        );
    }
}

export default Task