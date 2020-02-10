import React, { Component } from 'react';

class ViewOrder extends Component {
    constructor(props){
        super(props);
    }

    printSalad(salad){
        let resultString = '';
        if (salad.foundation){
            resultString += salad.foundation[0].ingredient;
        }
        if (salad.protein){
            resultString += salad.protein.map(ing => ing.ingredient).reduce((x, xs) => x + ', ' + xs, '');
        }
        if (salad.extra){
            resultString += salad.extra.map(ing => ing.ingredient).reduce((x, xs) => x + ', ' + xs, '');
        }
        if (salad.dressing){
            resultString += ', ';
            resultString += salad.dressing[0].ingredient;
        }

        return resultString;
    }

    render(){
        const orders = this.props.orders;
        let counter = 0;
        return(
            <div>
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
            </div>

        );
    }
}

export default ViewOrder;