import React, { Component } from 'react';
import { connect } from "react-redux";
import Modal from 'react-responsive-modal'
import {hideUpdateModalAction,newBookUpdateAction} from "../store/actions/actions";
class BookUpdateModal extends Component {
    constructor(props){
        super(props)
        this.handleChange= this.handleChange.bind(this)
        this.handleModalCLose = this.handleModalCLose.bind(this)
        this.handleBookUpdate = this.handleBookUpdate.bind(this)
        this.state={
            title:'',
            publisher:'',
            author:'',
            genre:'',
            pages:0,
            buy_url:'',
            img_url:'',
            description:'',
            isMobile:false
        }
    }
    componentWillReceiveProps(props){
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    this.setState({isMobile:true})
}
        let newBook = props.updateBook
        this.setState({
            title:newBook.title,
            publisher:newBook.publisher,
            author:newBook.author,
            genre:newBook.genre,
            pages:newBook.pages,
            buy_url:newBook.buy_url,
            image_url:newBook.image_url,
            description:newBook.description
        })
    }
   async handleBookUpdate(e){
        e.preventDefault()
        let id = this.props.updateBook._id
        const book = this.state
        delete book.isMobile
        await fetch('/api/books/'+id, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
          }).then(res=>res.json()).then(data=>{
              if(data){
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
                this.props.newBookUpdate(data)
                this.props.hideUpdateModal()
              }
              else
              alert(data.message)
          }).catch(err=>console.error(err));

    }
    handleModalCLose(){
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    this.setState({isMobile:true});
        }
        else
        this.setState({
            isMobile:false
        })
        this.props.hideUpdateModal();
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
  render() {
    return (
        <Modal  open={this.props.updateModal} onClose={this.handleModalCLose} little >
        <br/>

            <h1 style={{textAlign:'center',textDecoration:'underline'}}>UPDATE BOOK</h1>
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
                        className='form-control input-sm' autoComplete='off' 
                        style={{width:this.state.isMobile?screen.width*0.8:600}}
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
                        style={{width:this.state.isMobile?screen.width*0.8:600}}
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
                        style={{width:this.state.isMobile?screen.width*0.8:600}}
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
                        style={{width:this.state.isMobile?screen.width*0.8:600}}
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
                        style={{width:this.state.isMobile?screen.width*0.8:600}}
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
                        style={{width:this.state.isMobile?screen.width*0.8:600}}
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
                        style={{width:this.state.isMobile?screen.width*0.8:600}}
                        placeholder='Enter Image URL'/>
                    </div>
                </div>
                <button onClick={this.handleBookUpdate} className="btn btn-lg btn-primary btn-block" type="submit">UPDATE BOOK</button><br/>
                </div>
            
        </Modal>
    )
  }
}
function mapStateToProps(state){
    return({
        updateModal:state.rootReducer.updateModal,
        updateBook:state.rootReducer.updateBook,
        index:state.rootReducer.updateIndex
    })
}

function mapActionsToProps(dispatch){
    return({
        hideUpdateModal:()=>{
            dispatch(hideUpdateModalAction())
        },
        newBookUpdate:(book)=>{
            dispatch(newBookUpdateAction(book))
        }
    })
}
export default connect(mapStateToProps,mapActionsToProps)(BookUpdateModal)