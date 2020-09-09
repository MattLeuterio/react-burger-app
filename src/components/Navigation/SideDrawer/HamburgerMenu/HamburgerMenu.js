import React from 'react';
import classes from './HamburgerMenu.css';

const HamburgerMenu = (props) => (
    <div onClick={props.show} className={classes.HamburgerMenu}>
        <div className={classes.Line}></div>
        <div className={classes.Line}></div>
        <div className={classes.Line}></div>
    </div>
)

export default HamburgerMenu;