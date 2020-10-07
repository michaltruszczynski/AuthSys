import React, { Component, Fragment } from 'react';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';

import Welcome from './pages/Welcome/Welcome';
import Signup from './pages/Auth/Signup';
import Signin from './pages/Auth/Signin';

class App extends Component {

  render() {
    return (
      <Fragment>
        <Layout>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
          </Switch>
        </Layout>
      </Fragment>
    );
  }
}

export default App;
