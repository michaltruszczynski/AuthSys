import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Welcome from './pages/Welcome/Welcome';
import Home from './pages/Home/Home';
import Signup from './pages/Auth/Signup';
import Signin from './pages/Auth/Signin';
import Logout from './pages/Auth/Logout';
import TestPage from './pages/TestPage/TestPage';
import AdminPage from './pages/AdminPage/AdminPage';
import ResetPassword from './pages/ResetPassword/ResetPassword';
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
            <Route path="/" exact component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/resetpassword" component={ResetPassword}/>
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
