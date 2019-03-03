import React, { Component } from 'react';
import './App.css';
import ScreenContainer from '../src/components/ScreenContainer';
import Footer from './common/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ScreenContainer/>
        <Footer/>
      </div>
    );
  }
}

export default App;
