import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSucces = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCES,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

// this action makes that the spinner begin to run
export const purchaseBurgerStart = ()=> {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurger = (orderData) =>{
    return (dispatch) => {
        dispatch(purchaseBurgerStart());        
        axios.post('/order.json', orderData).then( response => {                                    
            dispatch( purchaseBurgerSucces(response.data.name, orderData) );
        }).catch( err => {
            dispatch(purchaseBurgerFail(err));
        });
    }
}

export const purchaseInit = ()=>{
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrderSuccess = (orders) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) =>{
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrders = ()=> {
    return dispatch => { 
        dispatch( fetchOrdersStart() );
        axios.get('/order.json').then(res=>{            
            let orders = [];
            for(let key in res.data){
                orders.push({
                    ...res.data[key],
                    id: key
                });
            }                     
            dispatch( fetchOrderSuccess(orders) );            
        }).catch(err=>{            
            dispatch( fetchOrderFail(err) );
        });
    }
}