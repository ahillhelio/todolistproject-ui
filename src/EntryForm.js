import React from 'react';

class EntryForm extends React.Component{
    state = {
        Task: "",
        Description: "",
        Completed: true
    }

    handleChange = ( { target} ) => {
        const key = target.name;
        this.setState({ [key] : target.value }, () => console.log(this.state[key]));
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const completed= this.state.Completed === true;

        fetch(`${process.env.REACT_APP_API_URL}/api/todolist`, {
            method: "POST",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify([{Task : this.state.Task, Description : this.state.Description, Completed : completed }])
        })
        .then(this.props.refresh)
        .then(() => this.setState({
            Task: "",
            Description: "",
            Completed: true
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

                    <input type="submit" value="Add Task"/>
                </form>
            )
        }
}

export default EntryForm; 