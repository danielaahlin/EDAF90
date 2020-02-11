import React, { Component } from 'react';

class ViewOrder extends Component {
    constructor(props){
        super(props);
    }

    printSalad(salad){
        let resultString = '';
        if (salad.foundation.length !== 0){
            resultString += salad.foundation[0].ingredient;
        }
        if (salad.protein.length !== 0){
            resultString += salad.protein.map(ing => ing.ingredient).reduce((x, xs) => x + ', ' + xs, '');
        }
        if (salad.extra.length !== 0){
            resultString += salad.extra.map(ing => ing.ingredient).reduce((x, xs) => x + ', ' + xs, '');
        }
        if (salad.dressing.length !== 0){
            resultString += ', ';
            resultString += salad.dressing[0].ingredient;
        }

        return resultString;
    }

    render(){
        const orders = this.props.orders;
        return(
            <div>
                <div>
                    <h3>Din beställning</h3>
                </div>
                <ul className='list-group'>
                    {orders.map(order => 
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={order.id}>
                            #{order.id} {this.printSalad(order.salad)}
                            <span className="badge badge-primary badge-pill">{order.price} kr</span>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default ViewOrder;

/* 
<table>
                    <thead>
                        <tr>
                            <th>Din beställning</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order =>
                            <tr>
                                <td>
                                    #{order.id}
                                </td>
                                <td>
                                    {this.printSalad(order.salad)}
                                </td>
                                <td>
                                    {order.price}kr
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
*/