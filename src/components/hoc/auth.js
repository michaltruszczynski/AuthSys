import React, { Component } from 'react';
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
            if (auth) {
                return <SpecificComponent {...this.props} />
            } else {
                // <Redirect to="/login" />
            }

        }
    }
    return connect(mapStateToProps, mapDispatchToProps)(authenticationCheck);


}

const mapStateToProps = state => {
    return {
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: () => dispatch(actions.authCheckState())
    }
}

export default auth;