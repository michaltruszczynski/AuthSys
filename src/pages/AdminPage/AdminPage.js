import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/Button/Button';

import { uppercaseFirstLetter } from '../../utility/utility';

import * as actions from '../../store/actions/index';
import { MESSAGE_TYPES } from '../../store/actions/messageTypes';
import styles from './AdminPage.module.css';

const usersListArr = [
    { id: 'sdf', name: 'Michal', email: 'test@test.com', userType: 'user' },
    { id: 'sgg', name: 'Pawel', email: 'test@test.com', userType: 'user' },
    { id: 'sdt', name: 'Wojtek', email: 'test@test.com', userType: 'user' },
    { id: 'swf', name: 'Przemek', email: 'test@test.com', userType: 'user' },
]

class AdminPage extends Component {

    state = {
        users: [],
        loading: false
    }

    componentDidMount() {
        console.log('test');
        this.setState({
            loading: true
        })
        axios.get('http://localhost:5000/api/admin/getusers')
            .then(response => {
                console.log(response.data)
                const { users } = response.data;
                this.setState({
                    users: users,
                    loading: false
                })
            }).catch(err => {
                console.log(err);
                this.setState({
                    loading: false
                });
                this.props.onSetMessage('Connection error.', ['Please try again '], MESSAGE_TYPES.error)
            })
    }

    componentDidUpdate() {
        console.log('did update')
    }

    resetPswdHandler = (userId) => {
        console.log('test');
        axios.get('http://localhost:5000/api/admin/resetpswd/' + userId)
    }

    render() {
        const { users } = this.state;
        console.log(users)
        let usersList = <Spinner />;

        if (!this.state.loading) {
            if (!users.length) return <div className={styles['table__message']}>No users found.</div>;
            usersList = (
                <ol className={styles['table']}>
                    <li className={[styles['attribute-container'], styles['table__heading']].join(' ')}>
                        <div className={styles['attribute']}>#</div>
                        <div className={styles['attribute']}>Name</div>
                        <div className={styles['attribute']}>Email</div>
                        <div className={styles['attribute']}>Role</div>
                        <div className={styles['attribute']}>Reset Password</div>
                    </li>
                    {users.map((user, index) => (
                        <li className={[styles['attribute-container'], styles['attribute-container--center']].join(' ')} key={user._id}>
                            <div className={styles['attribute']} data-name="#">{index + 1}</div>
                            <div className={styles['attribute']} data-name="Name:">{uppercaseFirstLetter(user.name)}</div>
                            <div className={styles['attribute']} data-name="Email:">{user.email}</div>
                            <div className={styles['attribute']} data-name="Role">{user.userType}</div>
                            <div className={styles['attribute']}>
                                <Button
                                    disabled={false}
                                    type="button"
                                    btnStyle="primary"
                                    clickHandler={() => this.resetPswdHandler(user._id)}>
                                    Reset Password
                                </Button>
                            </div>
                        </li>
                    ))}
                </ol>
            )
        }

        return (
            <div className={styles['table-container']}>{usersList}</div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onSetMessage: (msgTitle, message, type) => dispatch(actions.setMessage(msgTitle, message, type))
    }
}

export default connect(null, mapDispatchToProps)(AdminPage);