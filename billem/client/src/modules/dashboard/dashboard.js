import React, { Component } from 'react';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <p>>Dashboard</p>
        <button onClick={() => changePage()}>Go to about page via redux</button>
      </div>
    );
  }
}

export default Dashboard;
