import React, { useContext } from 'react';

import './App.css';
import Navbar from "./components/Navbar";
import LoginForm from "./components/Form";
import Welcome from "./components/Welcome";
import AuthContext from './store/auth-context'

function App() {

    const ctx = useContext(AuthContext);

    return (
    <div className="App">
            <Navbar />
            { !ctx.isLoggedIn && <LoginForm />}
            { ctx.isLoggedIn && <Welcome />}
    </div>
  );
}

export default App;
