import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import Login from './components/Login';
import Books from './components/Books';
import history from './History'
import Genre from './components/Genre';
// import createBrowserHistory from 'history/createBrowserHistory'

// const history = createBrowserHistory()

class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route path="/login" component={Login} />
                    <Route exact path="/" component={Books} />
                    <Route  path="/genres" component={Genre} />
                </div>
            </Router>
        )
    }
}

export default Routers;