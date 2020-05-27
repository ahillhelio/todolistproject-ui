import React from 'react';

class EntryForm extends React.Component{
    state = {
        Task: "",
        Description: "",
        othertasks: [],
        subtask: ""
    }

    handleChange = ( { target} ) => {
        const key = target.name;
        this.state.othertasks=this.state.subtask.split(",").map((subtask) => {
            return {
                completed: false,
                subtask: subtask
            }
        })
        this.setState({ [key] : target.value }, () => console.log(this.state[key]));
    }

    handleSubmit = (event) => {
        event.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/api/todolist`, {
            method: "POST",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify([
                {
                    Task : this.state.Task, 
                    Description : this.state.Description, 
                    othertasks: this.state.othertasks
                }])  
                // DO I NEED ] between { and ) ?
        })
        .then(this.props.refresh)
        .then(() => this.setState
        ({
            Task: "",
            Description: "",
            othertasks: []
        }));
    }
        render() {
            return(
                <form onSubmit={this.handleSubmit}>

                    <input 
                    name="Task" 
                    type="text"
                    value={this.state.Task}
                    placeholder= "Task to do"
                    onChange={this.handleChange}/>

                    <input 
                    name="Description" 
                    type="text"
                    value={this.state.Description}
                    placeholder= "Describe Task"
                    onChange={this.handleChange}/>

                    <input 
                    name="subtask" 
                    type="text"
                    value={this.state.subtask}
                    placeholder= "Sub-Tasks"
                    onChange={this.handleChange}/>

                    <input type="submit" value="Add Task"/>

                </form>
            )
        }
}

export default EntryForm; 