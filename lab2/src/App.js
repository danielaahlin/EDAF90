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

        this.fetchFromServer('foundations');
        this.fetchFromServer('proteins');
        this.fetchFromServer('extras');
        this.fetchFromServer('dressings');
    }

    updateOrder(toAdd){
        let tmpList = this.state.orders;
        tmpList.push(toAdd);
        console.log('hejk');
        this.postSalad(toAdd);
        
        this.setState({
            orders : tmpList
        })
    }

    fetchFromServer(url){
        let path = 'http://localhost:8080/' + url + '/';
        fetch(path)
            .then((response) => {
                if(!response.ok){
                    throw new Error('WHEP');
                }
                return response.json();
            }).then((myJson) => {
                myJson.map((x) => {
                    fetch(path.concat(x))
                    .then((response) => {
                        if(!response.ok){
                            throw new Error('WHEP');
                        }
                        return response.json();
                    }).then((myJson) => {
                        // this.state.inventory[x] = myJson;
                        // this.setState();
                        this.setState({
                            inventory: {
                                ...this.state.inventory,
                                [x] : myJson
                            }
                        });
                    }).catch((error) => {
                        console.error('ops');
                    });
                });
                return myJson;
            }).catch((error) => {
                console.error("There's been an error with the fetch.")
            });
    }

    postSalad(salad){
        console.log('called');
        fetch('http://localhost:8080/orders/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(salad),
        });
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
