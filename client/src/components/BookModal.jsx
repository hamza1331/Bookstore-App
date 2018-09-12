import React, { Component } from 'react';
import { connect } from "react-redux";
import Modal from 'react-responsive-modal'
import { hideBookModalAction,addBookInStoreAction } from "../store/actions/actions";
class BookModal extends Component {
    constructor(props){
        super(props)
        this.handleChange= this.handleChange.bind(this)
        this.handleModalCLose = this.handleModalCLose.bind(this)
        this.handleBookSubmit = this.handleBookSubmit.bind(this)
        this.state={
            title:'',
            publisher:'',
            author:'',
            genre:'',
            pages:0,
            buy_url:'',
            img_url:'',
            description:''
        }
    }
   async handleBookSubmit(e){
        e.preventDefault()
        const book = this.state
        await fetch('/api/books', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
          }).then(res=>res.json()).then(data=>{
              if(data){
                this.props.addBookInStore(data)
                this.setState({
                    title:'',
                    publisher:'',
                    author:'',
                    genre:'',
                    pages:0,
                    buy_url:'',
                    image_url:'',
                    description:''
                })
                this.props.hideBookModal()
              }
              else
              alert(data.message)
          }).catch(err=>console.error(err));

    }
    handleModalCLose(){
        this.props.hideBookModal()
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
  render() {
    return (
        <Modal  open={this.props.bookModal} onClose={this.handleModalCLose} little >
        <br/>

            <h1 style={{textAlign:'center',textDecoration:'underline'}}>INSERT BOOK</h1>
            <div className="form-horizontal">
                <div className="form-group">
                    <div className="col-sm-10">
                        <input 
                        type="text"
                        required
                        autoFocus={true}
                        value={this.state.title} 
                        name="title"
                        onChange={this.handleChange} 
                        className='form-control' autoComplete='off' 
                        style={{width:600}}
                        placeholder='Enter Book Title'/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-10">
                        <input 
                        type="text"
                        required
                        value={this.state.author} 
                        name="author"
                        onChange={this.handleChange} 
                        className='form-control' autoComplete='off' 
                        style={{width:600}}
                        placeholder='Enter Author Name'/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-10">
                        <input 
                        type="text"
                        required
                        value={this.state.genre} 
                        name="genre"
                        onChange={this.handleChange} 
                        className='form-control' autoComplete='off' 
                        style={{width:600}}
                        placeholder='Enter Genre'/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-10">
                        <input 
                        type="text"
                        required
                        value={this.state.publisher} 
                        name="publisher"
                        onChange={this.handleChange} 
                        className='form-control' autoComplete='off' 
                        style={{width:600}}
                        placeholder='Enter Publisher Name'/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-10">
                        <input 
                        type="number"
                        required
                        value={this.state.pages} 
                        name="pages"
                        onChange={this.handleChange} 
                        className='form-control' autoComplete='off' 
                        style={{width:600}}
                        min={0}
                        max={8000}
                        />
                    </div>
                    </div>
                    <textarea value={this.state.description} onChange={this.handleChange} name="description" style={{resize:'none',maxWidth:600}} placeholder='Book Description' cols="20" rows="3" className='form-control'></textarea><br/>
                    <div className="form-group">
                    <div className="col-sm-10">
                        <input 
                        type="text"
                        required
                        value={this.state.buy_url} 
                        name="buy_url"
                        onChange={this.handleChange} 
                        className='form-control' autoComplete='off' 
                        style={{width:600}}
                        placeholder='Enter Purchase URL'/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-10">
                        <input 
                        type="text"
                        required
                        value={this.state.image_url} 
                        name="image_url"
                        onChange={this.handleChange} 
                        className='form-control' autoComplete='off' 
                        style={{width:600}}
                        placeholder='Enter Image URL'/>
                    </div>
                </div>
                <button onClick={this.handleBookSubmit} className="btn btn-lg btn-success btn-block" type="submit">SUBMIT BOOK</button><br/>
                </div>
            
        </Modal>
    )
  }
}
function mapStateToProps(state){
    return({
        bookModal:state.rootReducer.bookModal
    })
}

function mapActionsToProps(dispatch){
    return({
        hideBookModal:()=>{
            dispatch(hideBookModalAction())
        },
        addBookInStore:(book)=>{
            dispatch(addBookInStoreAction(book))
        }
    })
}
export default connect(mapStateToProps,mapActionsToProps)(BookModal)