import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact  >Burger Builder</NavigationItem>        
        
        {
            props.isAuthenticated ? <NavigationItem link="/orders" >Checkout</NavigationItem> : null
        }

        { 
            props.isAuthenticated ? 
            <NavigationItem link="/logout" >Logout</NavigationItem> : 
            <NavigationItem link="/auth" >Login</NavigationItem>
        }

        
    </ul>
);

export default navigationItems;