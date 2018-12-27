import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFonud from '@views/404';
import BasicLayout from './BasicLayout';
import DiskLayout from './DiskLayout';

export default class Layout extends Component{
    render(){
        return(
            <Switch>
                <Redirect from="/" exact to="/findmusic/playlist" />
                <Route path="/song" render={props => <DiskLayout {...props} />} />
                <Route path="/" render={props => <BasicLayout {...props} />} />
                <Route componnet={NotFonud} />
            </Switch>
        )
    }
};
