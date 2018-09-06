import React, { Component } from 'react'
import { connect } from "react-redux";
class Genres extends Component {
    render() {
    return (
      <div className='container'>
        <h2>Welcome from Genres</h2>
      </div>
    )
  }
}
function mapStateToProps(state){
    return({
    })
}



function mapActionsToProps(dispatch){
    return({
        
    })
}
export default connect(mapStateToProps,mapActionsToProps)(Genres)
