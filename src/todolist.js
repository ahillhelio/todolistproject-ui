import React, { Component } from 'react';
import EntryForm from './EntryForm';
import DeleteEntry from './deleteEntry';

class ToDo extends Component {
    constructor(props){
        super(props);
        this.state ={
            entry : [

            ],
            isCreate : true,
        }
    }

    getEntry = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/todolist`) 
        .then(response => response.json())
        .then(data => this.setState( {entry : data, isCreate: true } ));
    };

    deleteEntry = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/api/todolist/${id}`, {
            method: 'DELETE'
        }) 
        .then(response => response.json())
        .then(console.log)
        .then(this.getFilm);
    };

    renderForm = () => {
        let result;
        if (this.state.isCreate){
            result = (<EntryForm key="createForm" refresh={this.getEntry} />);
        }else{
            result = < EntryForm refresh={this.EntryForm}/>
        }
        return result;
    };

    componentDidMount (){ 
        this.getEntry();
    };

    render(){ 
        console.log(this.state.entry);
        const displayEntry = this.state.entry.map((entry) => {
                const displayOtherTasks = entry.othertasks.map((othertask) => {
                    return (<div>
                            {othertask}
                        {/* this is the part that gets tricky */}
                    </div>)
                })
            
                return <div>
                            TASK NAME: {entry.Task} <br></br>
                            DESCRIPTION: {entry.Description}<br></br>
                            OTHER TASKS: {displayOtherTasks}
                        <br></br>
                            <DeleteEntry entry={entry} 
                            deleteEntry={this.deleteEntry}
                            />
                        </div> 
                
        
        })      

        
        return (
            <>
            <h2>TO-DO LIST</h2>
            {this.renderForm()}
            {displayEntry} 
            </>
        )
    } 
};

export default ToDo;