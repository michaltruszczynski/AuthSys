import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';


const auth = (SpecificComponent, option) => {
    class authenticationCheck extends Component {
        state = {
            temp: null
        }


        componentDidMount() {
            this.props.onAuth();
            console.log('[HOC auth]')
        }

        render() {
            console.log('[HOC auth] ', this.props.token )
            if (this.props.token) {
                return <SpecificComponent {...this.props} />
            } else {
                return <Redirect to="/signin" />
            }

        }
    }
    return connect(mapStateToProps, mapDispatchToProps)(authenticationCheck);


}

const mapStateToProps = state => {
    return {
        error: state.error,
        token: state.token

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: () => dispatch(actions.authCheckState())
    }
}

export default auth;