import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {sendTodoItem} from '../actions'; 

class AddItem extends Component {

    async handleAddItem(values){
        // console.log("Form Values: ", values);
        await this.props.sendTodoItem(values);
        
        //programmatically reroute somewhere.  history comes from react router
        this.props.history.push('/');
    }

    renderInput({label, input, meta: {touched, error}}){
        // console.log("Render Input, ", props);
        // const {label, input, meta: {touched, error}} = props;
        return(
            <div className="col s8 offset-2">
                <label>{label}</label>
                <input {...input} type="text" autoComplete="off"/>
                <p className="red-text">{touched && error}</p>
            </div>
        )
    }

    render(){
        // console.log('Add item props: ', this.props);

        const {handleSubmit} = this.props;

        return(
            <div>
                <h1 className="center">Add Item</h1>
                <div className="row right-align">
                   <Link to="/" className="btn green">View To Do List</Link>
                </div>

                <form onSubmit={handleSubmit(this.handleAddItem.bind(this))}>
                    <div className="row">
                        <Field name="title" component={this.renderInput} label="Title"/> 
                    </div>
                    <div className="row">
                        <Field name="details" component={this.renderInput} label="Item Details"/> 
                    </div>
                    <div className="row right-align">
                        <button className="btn green">Add Item</button>
                    </div>
                </form>
            </div>
        );
    }
}

function validate(values){
    const {title, details} = values;
    const errors = {};

    //any kind of check
    if(!title){
        //on errors object, the property name has to match the same name as the field
        errors.title = "Please add a title.";
    }
    if(!details){
        errors.details = "Please add some details about your to do item.";
    }
    return errors;
}

//Takes existing component and wrapping it in redux form and adding redux for functionality
AddItem = reduxForm({
    form: 'add-item',
    //redux looks for validate key where the valiate function is
    validate: validate
})(AddItem);

export default connect(null, {sendTodoItem: sendTodoItem})(AddItem);