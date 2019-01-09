import React from 'react';

import classes from './Logo.css';

const logo = (props)=> (
    <div className={classes.Logo} style={{height: props.height, marginBottom: props.margin_bottom}}>
        <img src='https://picsum.photos/300/200?random' alt='someone' />
    </div>
);

export default logo;