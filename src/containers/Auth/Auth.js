import React from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.css';

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
        }
    }

    render() {

        let formElements = [];
        for (let input in this.state.auth) {
            formElements.push({
                ...this.state.auth[input],
                id: input
            })
        }

        return (
            <div className={classes.Auth}>
                <form>

                    {formElements.map(formElement => (
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
                    ))}

                    <Button btnStyle='Success'>Log In</Button>
                </form>
            </div>
        );
    }
}

export default Auth;