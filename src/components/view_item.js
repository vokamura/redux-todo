import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSingleItem} from '../actions';

class ViewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    async componentDidMount() {
        const {item_id} = this.props.match.params;
        const newState = {
            loading: false,
            error: ''
        };
        // console.log('Item ID: ', item_id);
        try{
            const resp = await this.props.getSingleItem(item_id);
            console.log('It worked');
            
        } catch (error) {
            console.log('It failed');
            newState.error = "Unable to load to do item";
        }
        this.setState(newState);
    }

    render() {
        const {item} = this.props;
        const {loading, error} = this.state;

        // console.log('Item: ', item)
        // console.log('View Item Props:', this.props);

        if (!item && loading) {
            return <h1>Loading...</h1>;
        }

        if(!loading && error) {
            return <h1>{error}</h1>;
        }

        return(
            <div>
                <h1>{item.title}</h1>
                <p><b>DETAILS: </b>{item.details}</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        item: state.list.single
    }
}

export default connect(mapStateToProps, {getSingleItem: getSingleItem})(ViewItem);