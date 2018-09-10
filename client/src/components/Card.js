import React from 'react'

export default (props) => {
  return (
    <div id={props.id} className="col-md-6">
    <article className="card">
<img style={{maxHeight:300,width:'100%'}} src={props.image_url} alt="Sample photo"/>
<div className="text">
<h3 style={{fontWeight:'bolder'}}>{props.title}</h3>
<h3>By {props.author}</h3>
<p>{props.description.substr(0,120)}...  <a href={props.buy_url} target='_blank'> Click here to read full description</a></p>
<p style={{textAlign:'right'}}>Pages: {props.pages}</p>
<button className='btn btn-info btn-block' onClick={e=>window.open(props.buy_url,'_blank')}>Click to Buy</button><br/>
{props.showControls && <button className='btn btn-success btn-block' onClick={e=>props.handleUpdate(props.id)}>Update Book</button>}
{props.showControls && <button className='btn btn-danger btn-block' onClick={e=>props.handleDelete(props.id)}>Delete Book</button>}
</div>
</article>
   </div>
  )
}
