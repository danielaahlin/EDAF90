import React, { Component } from 'react';

class ViewOrder extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const orders = this.props.orders;
        console.log(orders);
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
                            <td>
                                {counter++} {order.foundation}
                            </td>
                        )}
                    </tbody>
                </table>
            </div>

        );
    }
}

export default ViewOrder;