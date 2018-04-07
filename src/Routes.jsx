import React from 'react';
import PropTypes from "prop-types";
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import TicketBoard from './component/TicketBoard';
import EditTicket from './component/EditTicket';

const Routes = (props) => {
    return (
        <Provider store={props.store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={TicketBoard} />
                    <Route path='/ticket/:ticketId' component={EditTicket} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

Routes.propTypes = {
    store: PropTypes.object,
}

export default Routes;