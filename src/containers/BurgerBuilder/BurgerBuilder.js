import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildConstrols/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENTS_PRICE = {
    salad: 5,
    bacon: 10,
    cheese: 15,
    meat: 20
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice : 0,
        purchasable : false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount(){
        axios.get('/ingredients.json').then( response => {
            this.setState({ ingredients: response.data });                      
        }).catch( error =>{
            console.log(error);
            this.setState({error: true});
        })
    }

    updatePurchesable(ingredients){
        let sum = Object.keys(ingredients)
        .map((key)=>{
            return ingredients[key];
        })
        .reduce((acum, currently)=>{
            return acum+currently;
        },0);

        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldMount = this.state.ingredients[type];        
        const updateMount = oldMount+1;        
        const cloneData = {...this.state.ingredients};
        cloneData[type] = updateMount;

        const oldPrice = this.state.totalPrice;
        const updatePrice = oldPrice + INGREDIENTS_PRICE[type]; 

        this.setState({ingredients:cloneData, totalPrice : updatePrice});
        this.updatePurchesable(cloneData);
    }

    removeIngredientHandler = (type)=>{
        const oldMount = this.state.ingredients[type];  
        if(oldMount <= 0){
            return false;
        }
        const updateMount = oldMount-1;        
        const cloneData = {...this.state.ingredients};
        cloneData[type] = updateMount;

        const oldPrice = this.state.totalPrice;
        const updatePrice = oldPrice - INGREDIENTS_PRICE[type]; 

        this.setState({ingredients:cloneData, totalPrice : updatePrice});
        this.updatePurchesable(cloneData);
    }
    
    purchaseHandler = ()=>{
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = ()=>{
        let queryParams  = [];
        
        queryParams.push("price="+this.state.totalPrice);
        for( let i in this.state.ingredients ){
            queryParams.push( encodeURIComponent(i) + "=" + encodeURIComponent( this.state.ingredients[i] ) )
        }
        const queryString = queryParams.join("&");
        
        this.props.history.push({
            pathname: '/checkout',
            search: queryString
        });
    }

    render(){
        const disabledButtons = {...this.state.ingredients};

        for(let key in disabledButtons){            
            disabledButtons[key] =  this.state.ingredients[key] <= 0            
        }       
        
        let summary = null;

        let burger = this.state.error ? <p> Ingredients can't be loaded!</p>:  <Spinner />
        
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        addIngredient={this.addIngredientHandler} 
                        removeIngredient={this.removeIngredientHandler}
                        disabled={disabledButtons}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}/>  
                </Aux>
            )

            summary = <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelHandler={this.purchaseCancelHandler}
                purchaseContinueHandler={this.purchaseContinueHandler}
                />

            if( this.state.loading ){
                summary = <Spinner />
            }
        }

     
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    { summary }
                </Modal>
                { burger }              
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);