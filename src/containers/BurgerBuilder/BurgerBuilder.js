import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildConstrols/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';



class BurgerBuilder extends Component {

    state = {        
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
    
    purchaseHandler = ()=>{
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = ()=>{        
        this.props.history.push('/checkout');
    }

    render(){
        const disabledButtons = {...this.props.ingr};

        for(let key in disabledButtons){            
            disabledButtons[key] =  this.props.ingr[key] <= 0            
        }       
        
        let summary = null;

        let burger = this.state.error ? <p> Ingredients can't be loaded!</p>:  <Spinner />
        
        if(this.props.ingr){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingr}/>
                    <BuildControls 
                        addIngredient={this.props.onIngredientAdded} 
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled={disabledButtons}
                        purchasable={ this.props.price > 0 }
                        ordered={this.purchaseHandler}
                        price={this.props.price}/>  
                </Aux>
            )

            summary = <OrderSummary 
                ingredients={this.props.ingr}
                price={this.props.price}
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

const mapStateToProps = (state) =>{
    return {
        ingr: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onIngredientAdded: (ingName)=> dispatch({ type: actions.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName)=> dispatch({ type: actions.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));