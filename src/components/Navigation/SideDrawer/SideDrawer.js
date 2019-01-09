import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';

import Aux from '../../../hoc/Aux/Aux';
import Bakcdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props)=>{

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Bakcdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <Logo height='11%' margin_bottom='32px' />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer; 