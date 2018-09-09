import React, { Component } from 'react';
import { connect } from "react-redux";
import './Admin.css'
import { LogoutAction} from "../store/actions/actions";
class Books extends Component {
    constructor(props){
        super(props)
        this.handleGenreLink = this.handleGenreLink.bind(this)
        this.handleHomeLink = this.handleHomeLink.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }
    handleLogout(e){
        e.preventDefault()
        this.props.Logout()
        this.props.history.push('/')
    }
    handleGenreLink(e){
        e.preventDefault()
        console.log('hit for Genre Page..')
    }
    handleHomeLink(e){
        e.preventDefault()
    }
    render() {
        if(!this.props.isLoggedIn)
        {
            return(
                <div>User must login...</div>
            )
        }
        else
        return (
            <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a onClick={this.handleHomeLink} className="navbar-brand"><h3 style={{display:'inline'}}>Dreamerz Bookstore</h3></a>
            </div>
            <ul className="nav navbar-nav navbar-right">
             {(this.props.isLoggedIn)&& <li><a onClick={this.handleGenreLink}><span className="glyphicon"></span> <h4 style={{display:'inline'}}>GENRES</h4></a></li>}
              {(this.props.isLoggedIn) && <button onClick={this.handleLogout} className="btn btn-danger navbar-btn">LOG OUT</button>}
            </ul>
          </div>
        </nav>
            </div>
        )
    }
}

function mapStateToProps(state){
    return({
        isLoggedIn:state.rootReducer.isLoggedIn,
        firstName:state.rootReducer.userName
    })
}

function mapActionsToProps(dispatch){
    return({
        Logout:()=>{
            dispatch(LogoutAction())
        }
    })
}


export default connect(mapStateToProps,mapActionsToProps)(Books);
