import React, { Component } from 'react';
import './App.css';

import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';
import ComposeSaladModal from './ComposeSaladModal';

class App extends Component {
    render() {
        return (
            <div>
                <div className="jumbotron text-center">
                    <h1>My Own Salad Bar</h1>
                    <p>Here you can order custom made salads!</p>
                </div>
                <ul>
                    <ComposeSaladModal inventory={inventory} />
                </ul>

            </div>
        );
    }
}

export default App;
