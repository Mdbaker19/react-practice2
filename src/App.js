import './App.css';
import Navbar from "./components/Navbar";
import LoginForm from "./components/Form";
import Welcome from "./components/Welcome";

import { useState, useEffect } from "react";

function App() {

    const storedUserLoginState = localStorage.getItem("isLoggedIn");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect( () => {
        if(storedUserLoginState === "1") setIsLoggedIn(true);
    }, [])

    const logOutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    }

    const logInHandler = (email, password) => {
        localStorage.setItem("isLoggedIn", "1");
        // the values should be validated but not in this dummy project
        setIsLoggedIn(true);
    }


    return (
    <div className="App">
        <Navbar logout={logOutHandler} isLoggedIn={isLoggedIn}/>
        { !isLoggedIn && <LoginForm login={logInHandler}/>}
        { isLoggedIn && <Welcome />}
    </div>
  );
}

export default App;
