import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../components/Order/CheckoutSummary/ContactData/ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component{

    checkoutCancelHandler = () => {
        this.props.history.push('/');
    }

    checkoutContinueHandler = ()=> {        
        this.props.history.push( this.props.match.path + '/contact-data' );
    }

    render(){

        let summary = <Redirect to='/' />;
        console.log(this.props.purchased);
        if(this.props.ingr){
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    { purchasedRedirect }
                    <CheckoutSummary 
                        ingredients={this.props.ingr}    
                        checkoutContinue={ this.checkoutContinueHandler }
                        checkoutCancel={ this.checkoutCancelHandler }
                    />
                    <Route 
                        path={this.props.match.path + '/contact-data'}    
                        component = { ContactData }                                     
                    />
                </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = (state)=>{
    return {
        ingr: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);