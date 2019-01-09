import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ()=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact  >Buurger Builder</NavigationItem>
        <NavigationItem link="/orders" >Checkout</NavigationItem>
    </ul>
);

export default navigationItems;