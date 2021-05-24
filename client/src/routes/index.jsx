import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UpdatePage from './UpdatePage';
import RestaurantDetails from './RestaurantDetails';
import Home from './Home';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/restaurants/:id/update" component={UpdatePage} />
                <Route exact path="/restaurants/:id" component={RestaurantDetails} />
            </Switch>
        </Router>
    )
}

export default Routes;
