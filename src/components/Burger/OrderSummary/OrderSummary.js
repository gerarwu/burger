import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {      

    render(){

        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map((igKey)=> {
            return (
                <li key={igKey}> 
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span> :  {this.props.ingredients[igKey]}
                </li>) ;
        });
        return (
            <Aux>
                <h3> Your Order </h3>
                <p>A delicious  burger with the following ingredients</p>
                {ingredientsSummary}
                <p>Total  price: {this.props.price}</p>
                <p>Continue to checkout? </p>
                <Button clicked={this.props.purchaseCancelHandler} btnStyle="Danger">CANCEL</Button>
                <Button clicked={this.props.purchaseContinueHandler} btnStyle="Success">CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;