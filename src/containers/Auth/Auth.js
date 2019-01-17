import React from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Auth extends React.Component {

    state = {
        auth: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Type your email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Type your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            }
        },
        signin: true
    }

    checkValidity(value, rules){
        let isValid = false;
        
        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '';
        }

        if(rules.minLength){
            isValid = value.trim().length >= rules.minLength && isValid;                    
        }

        if(rules.maxLength){
            isValid = value.trim().length <= rules.maxLength && isValid;            
        }

        return isValid;
    }

    inputChangeHandler = (event, controlName) =>{
        const updatedControls = {
            ...this.state.auth,
            [controlName]: {
                ...this.state.auth[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.auth[controlName].validation),
                touched: true
            }
        }
        this.setState({auth: updatedControls});
    }

    autenticate = (event) => {
        event.preventDefault();
        this.props.onAuthenticate(this.state.auth.email.value, this.state.auth.password.value, this.state.signin);        
    }

    switchTypeSignHandler = ()=> {
        this.setState({signin: !this.state.signin});
    }

    render() {       

        let formElements = [];
        for (let input in this.state.auth) {
            formElements.push({
                ...this.state.auth[input],
                id: input
            })
        }

        let inputs = formElements.map(formElement => (
            <Input
                elementtype={formElement.elementType}
                name={formElement.id}
                key={formElement.id}
                {...formElement.elementConfig}
                invalid={!formElement.valid}
                shouldValidate={formElement.validation}
                touched={formElement.touched}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
            />
        ));

        if(this.props.loading){
            inputs = <Spinner />;
        }

        let error = this.props.error ? this.props.error.message : null ;        

        return (
            <div className={classes.Auth}>

                <p>{ error }</p>

                <form onSubmit={this.autenticate} >

                    { inputs }

                    <Button btnStyle='Success'>Submit { this.state.signin ? 'Sign in': 'Sign up' } </Button>
                </form>
                <Button btnStyle='Danger' clicked={ this.switchTypeSignHandler }>{ this.state.signin ? 'Sign up': 'Sign in'} </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: ( email, password, isSignin )=> dispatch(actions.authenticate(email, password, isSignin))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);