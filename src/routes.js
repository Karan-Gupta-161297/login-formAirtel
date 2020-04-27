import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';
import Welcome from '././components/Welcome/Welcome';
import Login from '././components/Login/Login';


const Routes = () => (
  <BrowserRouter >
      <Switch>
          <Route exact path="/" component={Welcome}/>
          <Route path="/Login" component={Login}/>
          </Switch>
  </BrowserRouter>
);

export default Routes;