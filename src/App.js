import React, { Component, Fragment } from 'react';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';

import Welcome from './pages/Welcome/Welcome';
import Signup from './pages/Auth/Signup';
import Signin from './pages/Auth/Signin';
import TestPage from './pages/TestPage/TestPage';

import Auth from './components/hoc/auth'

class App extends Component {

  render() {
    return (
      <Fragment>
        <Layout>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/test" component={Auth(() => <TestPage number={"Different route"} />)}/>
            <Route path="/" component={Auth(Welcome)} />
          </Switch>
        </Layout>
      </Fragment>
    );
  }
}

export default App;
