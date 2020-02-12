import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';

import ViewOrder from './ViewOrder';
import ComposeSalad from './ComposeSalad';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {orders : [], inventory : {}}

        this.updateOrder = this.updateOrder.bind(this);
    }

    updateOrder(toAdd){
        let tmpList = this.state.orders;
        tmpList.push(toAdd);
        
        this.setState({
            orders : tmpList
        })
    }

    render() {
        const composeSaladElem = (params) => <ComposeSalad {...params} inventory={this.state.inventory} func={this.updateOrder} />;
        const viewOrderElem = (params) => <ViewOrder {...params} orders={this.state.orders}/>;
        return (
            <div>
                <div className='jumbotron text-center'>
                    <h1>My Own Salad Bar</h1>
                    <p>Here you can order custom made salads!</p>
                </div>

                <div>
                    <Router>
                        <ul className='nav nav-pills'>
                            <li className='nav-item'>
                                <Link className='nav-link' to='compose-salad'>Komponera din egen sallad</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='view-order'>Din beställning</Link>
                            </li>
                        </ul>

                        <Route path='/compose-salad' render={composeSaladElem}></Route>
                        <Route path='/view-order' render={viewOrderElem}></Route>

                    </Router>
                </div>

                
            </div>
        );
    }
}

export default App;
