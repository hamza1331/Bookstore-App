import React, { Component } from 'react';
import { connect } from "react-redux";
import './Admin.css'
import { Logout} from "../store/actions/actions";
class Books extends Component {
    render() {
        if(!this.props.isLoggedIn)
        {
            return(
                <div>ADMIN must login...</div>
            )
        }
        else
        return (
            <div>
                <h2>Hello from Book Store...</h2>
            </div>
        )
    }
}

function mapStateToProps(state){
    return({
        isLoggedIn:state.rootReducer.isLoggedIn
    })
}

function mapActionsToProps(dispatch){
    return({
        Logout:()=>{
            dispatch(Logout())
        }
    })
}


export default connect(mapStateToProps,mapActionsToProps)(Books);
