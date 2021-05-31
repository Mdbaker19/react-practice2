import './LoginForm.css'
import {useState} from "react";
const LoginForm = props => {

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const [loginInBtn, setLoginBtn] = useState(false);

    const loginHandler = (e) => {
        e.preventDefault();
        props.login(emailInput, passwordInput);
    }

    const emailChangeHandler = (e) => {
        setEmailInput(e.target.value);
        setLoginBtn(e.target.value.includes("@") &&
                        e.target.value.includes(".") &&
                        passwordInput.trim().length > 6);
    }

    const passwordChangeHandler = (e) => {
        setPasswordInput(e.target.value);
        setLoginBtn(emailInput.includes("@") &&
            emailInput.includes(".") &&
            e.target.value.trim().length > 6);
    }


    return (
        <div className="row container login-form">
            <form className="col s12" onSubmit={loginHandler}>
                <div className="row">
                    <div className="input-field col s12">
                        <input value={emailInput} onChange={emailChangeHandler} id="email" type="email" className="validate" />
                            <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input value={passwordInput} onChange={passwordChangeHandler} id="password" type="password" className="validate" />
                            <label htmlFor="password">Password</label>
                    </div>
                </div>
                <button
                    disabled = {!loginInBtn}
                    className="btn">Login</button>
            </form>
        </div>
    )
}

export default LoginForm;