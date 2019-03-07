import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import BarChart from './components/BarChart';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BarChart />
      </div>
    );
  }
}

export default App;
