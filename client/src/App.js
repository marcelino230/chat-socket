import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Chat from './components/chat/Chat'
import SignIn from './components/SignIn'
import ReactNotification from 'react-notifications-component'

const App = () => {
    sessionStorage.clear(); // when a refresh occurs, then the user will have to signin again.
    return (
        <div>
            <ReactNotification />
            <Router>
                <Switch>
                    <Route path="/" exact component={SignIn} />
                    <Route path="/chat" component={() => sessionStorage.getItem('username') ? <Chat /> : <Redirect to="/" />} />
                    <Route component={SignIn} />
                </Switch>
            </Router>
        </div>
    );
}

export default App
