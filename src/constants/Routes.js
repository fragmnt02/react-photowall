import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Nueva from '../Nueva';
import Fotos from '../Fotos'

const Routes = () => {
  return(
    <React.Fragment>
      <Switch>
        <Route strict exact path='/nueva' component={Nueva}/>
        <Route strict exact path='/fotos' component={Fotos}/>
        <Redirect from='/' to='/fotos' />
      </Switch>
    </React.Fragment>
  );
}
  
  export default Routes;