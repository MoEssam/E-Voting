import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from './components/signup';
import SignIn from './components/signin';
import Vote from './components/vote';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/vote">
              <Vote />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
