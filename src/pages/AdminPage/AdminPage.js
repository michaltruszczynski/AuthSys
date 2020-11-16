import React, { Component } from 'react';

class AdminPage extends Component {
    render() {
        return (
            <div className="table-container">
                <div className="table-hading">Table Heading</div>

                <div className="table-main-content">
                    <div>No</div><div>Name</div><div>Surname</div><div>Email<div></div>User type</div>
                
                </div>
                <div>Page no</div>
            </div>
        )
    }
}

export default AdminPage;