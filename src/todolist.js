import React, { Component } from 'react';
import EntryForm from './EntryForm';

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

    renderForm = () => {
        let result;
        if (this.state.isCreate){
            result = (<EntryForm key="createForm" refresh={this.getEntry} />);
        }else{
            result = <EntryForm/>
            //const data = this.state.updateEntry;
            //result= <EntryUpdate key={data._id} entry={data} refresh={this.getEntry}/>;
        }
        return result;
    };

    componentDidMount (){ 
        this.getEntry();
    };

    render(){ 
        console.log(this.state.entry)
        const displayEntry = this.state.entry.map((entry) => {

                return (<div>
                            {entry.Task}, {entry.Description}
                        </div> 
                )
        
        })      

        console.log(this.state.entry);
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