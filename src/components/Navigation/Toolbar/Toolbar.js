import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import HamburgerMenu from '../SideDrawer/HamburgerMenu/HamburgerMenu';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <HamburgerMenu show={props.show} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;