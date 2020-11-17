import React, { Component } from 'react';

import styles from './AdminPage.module.css'

const usersList = [
    { id: 'sdf', name: 'Michal', email: 'test@test.com', userType: 'user' },
    { id: 'sgg', name: 'Pawel', email: 'test@test.com', userType: 'user' },
    { id: 'sdt', name: 'Wojtek', email: 'test@test.com', userType: 'user' },
    { id: 'swf', name: 'Przemek', email: 'test@test.com', userType: 'user' },
]

class AdminPage extends Component {
    render() {
        return (
            <section className={styles['table-container']}>
                <ol>
                    <li className={[styles['attribute-container'], styles['table__heading']].join(' ')}>
                        <div className={styles['attribute']}>#</div><div className={styles['attribute']}>Name</div><div className={styles['attribute']}>Email</div><div className={styles['attribute']}>Role</div><div className={styles['attribute']}>Reset Password</div>
                    </li>
                    {usersList.map((user, index) => (
                        <li className={styles['attribute-container']} key={user.id}>
                            <div className={styles['attribute']} data-name="#">{index + 1}</div><div className={styles['attribute']} data-name="Name:">{user.name}</div><div className={styles['attribute']} data-name="Email:">{user.email}</div><div className={styles['attribute']} data-name="Role">{user.userType}</div><div className={styles['attribute']}>Reset Pswd</div>
                        </li>
                    ))}
                </ol>
            </section>
        )
    }
}

export default AdminPage;