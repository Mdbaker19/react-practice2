import React, { useContext } from 'react';
import './Navbar.css'
import AuthContext from '../../src/store/auth-context';


// the ctx on logout is not exaclty needed as the method is not passed further down, it is actually  used by this component
// useContext is typically used to clean up a large props chain of passing data down the component tree and back up to another one

const Navbar = () => {

    const ctx = useContext(AuthContext);

    return (

                    <nav>
                            <div className="nav-wrapper">
                                <a href="https://www.google.com" className="brand-logo">Typical Page</a>
                                {ctx.isLoggedIn && <ul id="nav-mobile" className="right hide-on-med-and-down">
                                    <li><a href="/">Users</a></li>
                                    <li><a href="/">Admin</a></li>
                                    <li>
                                        <button className="navButton" onClick={ctx.onLogout}>Logout</button>
                                    </li>
                                </ul>}
                            </div>
                        </nav>
            )

}

export default Navbar;