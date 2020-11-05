import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

const auth = (SpecificComponent, option) => {
    class authenticationCheck extends Component {
        render() {
            if (this.props.token) {
                return <SpecificComponent {...this.props} />
            } else {
                return <Redirect to="/signin" />
            }
        }
    }
    return connect(mapStateToProps)(authenticationCheck);
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default auth;