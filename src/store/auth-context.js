import React, { useState, useEffect } from 'react';

// React Context API
// all components wrapped in this component will have access to this auth context component
// get an object that contains a component
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const storedUserLoginState = localStorage.getItem("isLoggedIn");
    useEffect( () => {
        if(storedUserLoginState === "1") setIsLoggedIn(true);
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
    };

    return <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler

    }}>{props.children}</AuthContext.Provider>
}

export default AuthContext;