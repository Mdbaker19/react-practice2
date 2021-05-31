import './Navbar.css'

const Navbar = props => {

    return (
        <>
            <nav>
                <div className="nav-wrapper">
                    <a href="https://www.google.com" className="brand-logo">Typical Page</a>
                    {props.isLoggedIn && <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="https://www.google.com">Components</a></li>
                        <li><a href="https://www.google.com">JavaScript</a></li>
                        <li><button className="navButton" onClick={props.logout}>Logout</button></li>
                    </ul>}
                </div>
            </nav>

        </>
    )

}

export default Navbar;