import React, { Component } from 'react';
import './App.css';

import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';

class App extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1>My Own Salad Bar</h1>
          <p>Here you can order custom made salads!</p> 
         </div>
        <div>
          Add your own react component here!
      </div>
      <ComposeSalad inventory={inventory} />
    </div>
    );
  }
}

export default App;
