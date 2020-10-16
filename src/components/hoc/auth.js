import React, {Component }from 'react';
import { connect } from 'react-redux';


const auth = (SpecificComponent, option) => {
    class authenticationCheck extends Component {
        state = {

        }


        componentDidMount() {

        }

        render() {
            if(auth) {
                return <SpecificComponent {...props} user={user} />
            } else {
                <Redirect to="/login" />
            }
            
        }
    }
    return authenticationCheck;
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default auth;