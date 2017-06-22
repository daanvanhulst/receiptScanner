import React, { Component } from 'react';
import Dashboard from './modules/dashboard/dashboard';
import Customer from './modules/customer/customer';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/customers">Customers</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Dashboard}/>
          <Route path="/customers" component={Customer}/>
        </div>
      </Router>
    );
  }
}

export default App;
