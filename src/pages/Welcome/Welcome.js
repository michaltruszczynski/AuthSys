import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';

import TestPage from '../TestPage/TestPage';

const Welcome = (props) => {
    return (
        <div>
            <p>Welcome</p>
            <Link to={props.match.path + 'testpage1/'}>Test Page 1</Link><br></br>
            <Link to={props.match.path + 'testpage2/'}>Test Page 2</Link><br></br>
            <Route path={props.match.path + 'testpage1/'} component={() => (<TestPage number={1}/>)} />
            <Route path={props.match.path + 'testpage2/'} component={() => (<TestPage number={2}/>)} />
        </div>



    )
}

export default withRouter(Welcome);