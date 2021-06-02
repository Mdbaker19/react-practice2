import './LoginForm.css'
import { useState, useEffect, useReducer } from "react";

const emailReducer = (state, action) => {
    if(action.type === "User_Input") {
        return {value: action.val, isValid: action.val.includes("@")}
    }
    if(action.type === "Input_Blur") {
        return {value: state, isValid: state.value.includes("@")}
        // use the latest state snapshot, it is ensured by React
    }
    return {value: "", isValid: false};
};
// outside of the component, will not depend on data from in the component
const passwordReducer = (state, action) => {
    if(action.type === "User_Input") {
        return {value: action.val, isValid: action.val.trim().length > 6};
    }
    if(action.type === "Input_Blur") {
        return {value: state, isValid: state.value.trim().length > 6};
    }
    return {value: "", isValid: false};
}

const LoginForm = props => {

    // const [emailInput, setEmailInput] = useState(""); // now with useReducer to manage both of these
    // const [emailValid, setEmailValid] = useState(true);
    // const [passwordInput, setPasswordInput] = useState("");
    // const [passwordValid, setPasswordValid] = useState(true);

    const [formIsValid, setFormIsValid] = useState(false);

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: "", isValid: false});
    const [emailState, dispatchEmail] = useReducer(emailReducer, {value: "", isValid: false});

    const { isValid: emailIsValid } = emailState; // pull out the isValid assigned to an alias in destructuring
    const { isValid: passwordIsValid } = passwordState; // to get the current isValid states to be used in useEffect, the isValid state is what is needed here

    useEffect(() => {
        const timerIdentifier = setTimeout( () => {
            console.log("Check validity!"); // happens after 500 ms after the user stops typing to reduce these checks.
            setFormIsValid(emailIsValid && passwordIsValid);
        }, 500);

        return () => {
            console.log("Clean up, running after first Check validity on input");
            clearTimeout(timerIdentifier); // clear the last time before a new one is set, creates a 500ms wait in the input
        }; // this will run after the first use effect runs and before it runs again, every new side effect
    }, [emailIsValid, passwordIsValid]);


    const loginHandler = (e) => {
        e.preventDefault();
        props.login(emailState.value, passwordState.value);
    }

    const emailChangeHandler = (e) => {
        // setEmailInput(e.target.value);
        dispatchEmail({type: "User_Input", val: e.target.value});
        // Function form for when the state update is dependent on the previous state

        // Not function form
        // Use effect removed the need for this it seems
        // setFormIsValid(e.target.value.includes("@") && // this could, in rare cases because it is not in function form, not have the most up to date password and a valid form could be sent
        //                 passwordInput.trim().length > 6);
    }

    const validateEmailHandler = () => {
        // setEmailValid(emailState.isValid); // now with useReducer...
        // two different states, emailValid dependent on the state of e
        // mailInput, could lead to a process error of the email being read, should be in function form but it is not an option setEmailValid( () => ....
        // can use useReducer

        dispatchEmail({type: "Input_Blur"}); // did the input lose focus? then validate
    }

    const passwordChangeHandler = (e) => {
        dispatchPassword({type: "User_Input", val: e.target.value});
        // Use effect removed the need for this it seems
        // setFormIsValid(emailInput.includes("@") &&
        //     e.target.value.trim().length > 6);
    }

    const validatePasswordHandler = () => {
        dispatchPassword({type: "Input_Blur"});
    }


    return (
        <div className="row container login-form">
            <form className="col s12" onSubmit={loginHandler}>
                <div className="row">
                    <div className={`${emailState.isValid ? "input-field col s12": "error input-field col s12"}`}>
                        <input onBlur={validateEmailHandler} value={emailState.value.value} onChange={emailChangeHandler} id="email" type="email" className="validate" />
                            <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className={`${passwordState.isValid ? "input-field col s12" : "error input-field col s12"}`}>
                        <input onBlur={validatePasswordHandler} value={passwordState.value.value} onChange={passwordChangeHandler} id="password" type="password" className="validate" />
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