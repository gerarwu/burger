import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../components/Order/CheckoutSummary/ContactData/ContactData';

class Checkout extends Component{
    
    state= {
        ingredients : {},
        totalPrice: 0
    }

    componentDidMount(){  
        let ingredients= {};
        const searchParams = new  URLSearchParams(this.props.location.search);
        for( let i of searchParams.entries() ){ 
            if( i[0] === 'price' )
                this.setState({totalPrice: i[1]});
            else
                ingredients[ i[0] ] = +i[1];
        }
    
        this.setState({ingredients: ingredients});
    }

    checkoutCancelHandler = () => {
        this.props.history.push('/');
    }

    checkoutContinueHandler = ()=> {        
        this.props.history.push( this.props.match.path + '/contact-data' );
    }

    render(){
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}    
                    checkoutContinue={ this.checkoutContinueHandler }
                    checkoutCancel={ this.checkoutCancelHandler }
                />
                <Route 
                    path={this.props.match.path + '/contact-data'}                     
                    render={ ()=> ( <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...this.props} /> ) }/>
            </div>
        );
    }
}

export default Checkout;