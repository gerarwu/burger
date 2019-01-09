import React from 'react';

import classes from './Input.css';

const Input = (props) => {   
    
        let input;    
        let styles = [classes.Input];
        let validationError;

        if(props.invalid && props.shouldValidate && props.touched ){
            styles.push(classes.Invalid);
            validationError = <p className={classes.ErrorMessage}> Please enter a valid {props.type} </p>
        }

        switch(props.elementtype){
            case ('input'):
                input =    (<input className={ styles.join(' ') } { ...props } onChange={props.changed} /> );
            break;

            case ('select'):
                input = (
                    <select className={ styles.join(' ') } onChange={props.changed} > 
                        {props.options.map(option => (
                          <option value={option.value} key={option.value} > {option.displayValue} </option>  
                        ))}
                    </select>
                );
            break;

            default :
                input = (<p> Not soported : '{props.elementtype} '</p>);
        }

        
    return ( 
        <div>
            {input}
            {validationError}
        </div>
        );
    
}

export default Input;