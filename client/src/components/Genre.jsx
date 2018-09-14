import React, { Component } from 'react';
import { connect } from "react-redux";
import './Admin.css'
import { LogoutAction,pushGenreAction,deleteGenreAction,updateGenreAction} from "../store/actions/actions";
class Genres extends Component {
    constructor(props){
        super(props)
        this.handleLogout=this.handleLogout.bind(this)
        this.handleHomeLink=this.handleHomeLink.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleInsert = this.handleInsert.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleUpdateButton = this.handleUpdateButton.bind(this)
        this.state={
          showGenreForm:false,
          name:'',
          showUpdateForm:false,
          id:''
                }
    }
    componentDidMount(){
        if(!this.props.genres.length){
          fetch('/api/genres')
          .then(res=>res.json())
          .then(genres=>{
            genres.forEach(genre=>{
              this.props.pushGenre(genre)
            })
          }).catch(err=>console.error(err))
        }   
    }
    async handleRemove(e){
      e.preventDefault();
      let id = e.target.id
      await fetch('/api/genres/'+id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(res=>res.json()).then(data=>{
          if(data){
              this.props.deleteGenre(id)
          }
      }).catch(err=>console.error(err));
    }
    handleChange(e){
      this.setState({
        [e.target.name]:e.target.value
      })
    }
    async handleUpdate(e){
      e.preventDefault()
      let genre = this.state
    delete genre.showGenreForm
    delete genre.showUpdateForm
    let id = this.state.id
    await fetch('/api/genres/'+id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(genre)
    }).then(res=>res.json()).then(data=>{
        if(data){
          this.setState({
            showGenreForm:false,
            name:'',
            showUpdateForm:false
          })
          let updatedGenre = {}
          updatedGenre.data = data
          updatedGenre.id = this.state.id
          this.props.updateGenre(updatedGenre)
        }
        else
        alert(data.message)
    }).catch(err=>console.error(err));
    }
    handleLogout(e){
      e.preventDefault()
      this.props.Logout()
      this.props.history.push('/')
  }
  handleHomeLink(e){
    e.preventDefault()
    this.props.history.push('/')
  }
  async handleInsert(e){
    e.preventDefault()
    const genre = this.state
    delete genre.showGenreForm
    delete genre.showUpdateForm
    delete genre.id
    await fetch('/api/genres', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(genre)
    }).then(res=>res.json()).then(data=>{
        if(data){
          this.props.pushGenre(data)
          this.setState({
              name:'',
              showGenreForm:false
          })
        }
        else
        alert(data.message)
    }).catch(err=>console.error(err));
  }
  handleUpdateButton(e){
    e.preventDefault()
    let genreId = this.props.genres[e.target.id]._id
    let oldValue = this.props.genres[e.target.id].name
    this.setState({
      id:genreId,
      name:oldValue,
      showGenreForm:false,
      showUpdateForm:true
    })
  }
  handleLogin(e){
    e.preventDefault()
    this.props.history.push('/login')
  }
    render() {
        return(
            <div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a onClick={this.handleHomeLink} className="navbar-brand"><h3 style={{display:'inline'}}>Dreamerz Bookstore</h3></a>
                </div>
                <ul className="nav navbar-nav navbar-right">
                  {(this.props.isLoggedIn) && <button onClick={this.handleLogout} className="btn btn-danger navbar-btn">LOG OUT</button>}
                  {(!this.props.isLoggedIn) && <button onClick={this.handleLogin} className="btn btn-info navbar-btn">LOGIN</button>}
                </ul>
              </div>
            </nav>
            <br/><br/><br/>
            {(this.props.isLoggedIn && !this.state.showGenreForm &&!this.state.showUpdateForm) && 
          <div className='text-center'><button onClick={()=>this.setState({showGenreForm:true})} className="btn btn-xlarge btn-warning">INSERT GENRE</button></div>
            }
          {(!this.state.showUpdateForm && this.state.showGenreForm) &&  <form onSubmit={e=>e.preventDefault()} role="form">  
    <div className="row">
    <div className="col-xs-2"></div>
      <div className="col-xs-8">
        <div className="input-group input-group-lg">
            <input type="text" autoFocus={true} autoComplete='off' value={this.state.name} name='name' onChange={this.handleChange} className="form-control" placeholder='Add Genre Name'/>
          <div className="input-group-btn">
            <button className="btn btn-success" onClick={this.handleInsert}>Add</button>
          </div>
        </div>
      </div>
      <div className="col-xs-2"></div>
    </div>
</form>}
          {(this.state.showUpdateForm && !this.state.showGenreForm) &&  <form onSubmit={e=>e.preventDefault()} role="form">  
    <div className="row">
    <div className="col-xs-2"></div>
      <div className="col-xs-8">
        <div className="input-group input-group-lg">
            <input type="text" autoFocus={true} autoComplete='off' value={this.state.name} name='name' onChange={this.handleChange} className="form-control" placeholder='Add Genre Name'/>
          <div className="input-group-btn">
            <button className="btn btn-info" onClick={this.handleUpdate}>Update</button>
          </div>
        </div>
      </div>
      <div className="col-xs-2"></div>
    </div>
</form>}
            <br/><br/>
            {this.props.isLoggedIn &&<div className="container">
              <ul className='list-group'>
                {this.props.genres.map((genre,index)=>{
                  return <div 
                  key={genre._id}>
                     <li
                   style={{width:screen.width*0.8}}
                   className='list-group-item list-group-item-info'>
                   {genre.name}
                   <span className='pull-right'><button className='btn btn-success btn-xs' 
                   onClick={this.handleUpdateButton} id={index}>Update </button>
                   <button id={genre._id} onClick={this.handleRemove} className='btn btn-xs btn-danger'> Delete</button>
                   </span>
                   </li><br/>
                  </div>
                })}
              </ul>
            </div>}
          </div>
        )
        // )
    }
}

function mapStateToProps(state){
    return({
        isLoggedIn:state.rootReducer.isLoggedIn,
        genres:state.rootReducer.genres
    })
}

function mapActionsToProps(dispatch){
    return({
        Logout:()=>{
            dispatch(LogoutAction())
        },
        pushGenre:(genre)=>{
          dispatch(pushGenreAction(genre))
        },
        deleteGenre:(id)=>{
          dispatch(deleteGenreAction(id))
        },
        updateGenre:(genre)=>{
          dispatch(updateGenreAction(genre))
        }
    })
}


export default connect(mapStateToProps,mapActionsToProps)(Genres);
