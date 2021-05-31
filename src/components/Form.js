import './LoginForm.css'
import { useState, useEffect } from "react";
const LoginForm = props => {

    const [emailInput, setEmailInput] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordInput, setPasswordInput] = useState("");

    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        setFormIsValid(emailInput.includes("@") &&
            emailInput.includes(".") &&
            passwordInput.trim().length > 6)
    }, [emailInput, passwordInput]);


    const loginHandler = (e) => {
        e.preventDefault();
        props.login(emailInput, passwordInput);
    }

    const emailChangeHandler = (e) => {
        setEmailInput(e.target.value);
        // Use effect removed the need for this it seems
        // setFormIsValid(e.target.value.includes("@") &&
        //                 e.target.value.includes(".") &&
        //                 passwordInput.trim().length > 6);
    }

    const validateEmailHandler = () => {
        setEmailValid(emailInput.includes("@") && emailInput.includes("."));
    }

    const passwordChangeHandler = (e) => {
        setPasswordInput(e.target.value);
        // Use effect removed the need for this it seems
        // setFormIsValid(emailInput.includes("@") &&
        //     emailInput.includes(".") &&
        //     e.target.value.trim().length > 6);
    }

    const validatePasswordHandler = () => {
        setPasswordValid(passwordInput.trim().length > 6);
    }


    return (
        <div className="row container login-form">
            <form className="col s12" onSubmit={loginHandler}>
                <div className="row">
                    <div className={`${emailValid ? "input-field col s12": "error input-field col s12"}`}>
                        <input onBlur={validateEmailHandler} value={emailInput} onChange={emailChangeHandler} id="email" type="email" className="validate" />
                            <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className={`${passwordValid ? "input-field col s12" : "error input-field col s12"}`}>
                        <input onBlur={validatePasswordHandler} value={passwordInput} onChange={passwordChangeHandler} id="password" type="password" className="validate" />
                            <label htmlFor="password">Password</label>
                    </div>
                </div>
                <button
                    disabled = {!formIsValid}
                    className="btn">Login</button>
            </form>
        </div>
    )
}

export default LoginForm;