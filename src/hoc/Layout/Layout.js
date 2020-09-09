import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    };


    // sideDrawerOpenHandler = () => {
    //     this.setState(
    //         {showSideDrawer: true}
    //     )
    // };

    toggleShowHandler = () => {
            this.setState(
                 {showSideDrawer: true}
            )
    }

    toggleHideHandler = () => {
        this.setState(
             {showSideDrawer: false}
        )
    }

    render () {
        return (
            <Aux>
                <Toolbar 
                    show={this.toggleShowHandler}
                />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.toggleHideHandler} 
                    />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;