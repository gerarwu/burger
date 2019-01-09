import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './Buildcontrol/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Total price: <strong>{props.price}</strong> </p>
        {controls.map(ctrl=>( 
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                add={()=>props.addIngredient(ctrl.type)}
                remove={()=>props.removeIngredient(ctrl.type)} 
                disabled={props.disabled[ctrl.type]} /> 
        ))}
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.ordered}>
        ORDER NOW</button>
    </div>
);

export default buildControls;