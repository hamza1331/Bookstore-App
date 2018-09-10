import React, { Component } from 'react';
import { connect } from "react-redux";
import './Admin.css'
import { LogoutAction,addBookInStoreAction} from "../store/actions/actions";
import Card from './Card'
class Books extends Component {
    constructor(props){
        super(props)
        this.handleGenreLink = this.handleGenreLink.bind(this)
        this.handleHomeLink = this.handleHomeLink.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleBookUpdate = this.handleBookUpdate.bind(this)
        this.handleBookDelete = this.handleBookDelete.bind(this)
    }
    componentDidMount(){
        fetch('/api/books').then(res=>res.json()).then(data=>{
            data.map(book=>this.props.addBookInStore(book))
        }).catch(err=>console.error(err))
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
    handleLogin(e){
        e.preventDefault()
        this.props.history.push('/login')
    }
    handleBookUpdate(id){
        console.log(id)
    }
    async handleBookDelete(id){
        await fetch('/api/accounts/signin', {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(res=>res.json()).then(data=>{
              if(data){
                  console.log('data deleted...')
              }
          }).catch(err=>console.error(err));
    }
    render() {
        // if(!this.props.isLoggedIn)
        // {
        //     return(
        //         <div>User must login...</div>
        //     )
        // }
        // else
        // return (
        return(
            <div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a onClick={this.handleHomeLink} className="navbar-brand"><h3 style={{display:'inline'}}>Dreamerz Bookstore</h3></a>
                </div>
                <ul className="nav navbar-nav navbar-right">
                 {(this.props.isLoggedIn)&& <li><a onClick={this.handleGenreLink}><span className="glyphicon"></span> <h4 style={{display:'inline'}}>GENRES</h4></a></li>}
                  {(this.props.isLoggedIn) && <button onClick={this.handleLogout} className="btn btn-danger navbar-btn">LOG OUT</button>}
                  {(!this.props.isLoggedIn) && <button onClick={this.handleLogin} className="btn btn-info navbar-btn">LOGIN</button>}
                </ul>
              </div>
            </nav>
            <br/><br/><br/>
            <div className="container">
            <div className="row">
            <div className="col-md-8">
           <div className="row">
                {this.props.books.map((book,index)=>{
                    return <Card 
                    key={index} 
                    title={book.title} 
                    description={book.description}
                    pages={book.pages}
                    buy_url={book.buy_url}
                    image_url={book.image_url}
                    author={book.author}
                    id={book._id}
                    showControls={this.props.isLoggedIn}
                    handleUpdate={this.handleBookUpdate}
                    handleDelete={this.handleBookDelete}
                    />
                })}
           </div>
            </div>
            <div className="col-md-2">
            </div>
            <div className="col-md-2">
            </div>
            </div>
            </div>
            </div>
        )
        // )
    }
}

function mapStateToProps(state){
    return({
        isLoggedIn:state.rootReducer.isLoggedIn,
        firstName:state.rootReducer.userName,
        books:state.rootReducer.books
    })
}

function mapActionsToProps(dispatch){
    return({
        Logout:()=>{
            dispatch(LogoutAction())
        },
        addBookInStore:(book)=>{
            dispatch(addBookInStoreAction(book))
        }
    })
}


export default connect(mapStateToProps,mapActionsToProps)(Books);
