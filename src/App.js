import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Welcome from './pages/Welcome/Welcome';
import Shop from './pages/Shop/Shop';
import Signup2 from './pages/Auth/Signup2';
import Signin2 from './pages/Auth/Signin2';
import Logout from './pages/Auth/Logout';
import TestPage from './pages/TestPage/TestPage';
import AdminPage from './pages/AdminPage/AdminPage';
import ChangePassword from './pages/ChangePassword/ChangePassword';

import Auth from './components/hoc/auth';
import * as actions from './store/actions/index';


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignin();
  }

  render() {
    return (
      <>
        <Layout>
          <Switch>
            <Route path="/signup" component={Signup2} />
            <Route path="/signin" component={Signin2} />
            <Route path="/test" component={Auth(() => <TestPage number={"Different route"} />)} />
            <Route path="/adminpage" component={AdminPage} />
            <Route path="/logout" component={Logout} />
            <Route path="/changepassword/:userId/:token" component={ChangePassword} />
            <Route path="/" component={Auth(Welcome)} />
          </Switch>
        </Layout>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
