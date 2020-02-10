import React, { Component } from 'react';
import './App.css';

import inventory from './inventory.ES6';
import ComposeSaladModal from './ComposeSaladModal';
import ViewOrder from './ViewOrder';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {orders : []}

        this.updateOrder = this.updateOrder.bind(this);
    }

    updateOrder(toAdd){
        console.log('hej');
        console.log(toAdd);
        this.setState({
            orders : toAdd
        })
    }

    render() {
        return (
            <div>
                <div className="jumbotron text-center">
                    <h1>My Own Salad Bar</h1>
                    <p>Here you can order custom made salads!</p>
                </div>
                <div>
                    <ComposeSaladModal inventory={inventory} func={this.updateOrder}/>
                </div>
                <div>
                    <ViewOrder orders={this.state.orders}/>
                </div>
            </div>
        );
    }
}

export default App;
