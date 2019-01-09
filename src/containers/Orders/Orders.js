import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{

    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){

        axios.get('/order.json').then(res=>{            
            let orders = [];
            for(let key in res.data){
                orders.push({
                    ...res.data[key],
                    id: key
                });
            }                        
            this.setState({orders: orders, loading: false});
        }).catch(err=>{
            this.setState({loading: false});
        })

    }

    render(){

        let orders =  <Spinner />;

        if(!this.state.loading){
            orders =  this.state.orders.map( order => <Order key={order.id} ingredients={order.ingredients} price={order.price} date={order.date} /> );
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);