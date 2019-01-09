import React from 'react';

import clasess from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {    
    let transformedIngredients = Object.keys(props.ingredients)
        .map((igKey)=>{
            return [...Array(props.ingredients[igKey])].map((_, i)=>{
                return <BurgerIngredient key={i+igKey} type={igKey}/>
            })
        }).reduce(function(arrAcum, element){
            return arrAcum.concat(element)
        }, []);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p> Introduce a item </p>
    }

    return (
        <div className={clasess.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;