import React from 'react';

import classes from './Order.css';

const order = (props) => {

    let ingredients = [];    
    for(let i in props.ingredients){
        ingredients.push({
            name : i,
            amount: props.ingredients[i]
        });
    }

    const ingredientsOutput = ingredients.map((i)=>{
        return <span key={i.name} > {i.name} ({i.amount}) </span>;
    })

    return (
        <div className={ classes.Order }>
            <div className={classes.Date}>Order date: { new Date(props.date) + "" } </div>
            <p>Ingredients: {ingredientsOutput} </p>
            <p>Total price: <strong> USD {props.price} </strong> </p>
        </div>
    )
}

export default order;