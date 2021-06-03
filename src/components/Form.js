import './LoginForm.css'
import { useState, useEffect, useReducer, useContext, useRef } from "react";
import AuthContext from '../store/auth-context';
import Input from '../UI/Input';

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

    const authContext = useContext(AuthContext);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    // const [emailInput, setEmailInput] = useState(""); // now with useReducer to manage both of these
    // const [emailValid, setEmailValid] = useState(true);
    // const [passwordInput, setPasswordInput] = useState("");
    // const [passwordValid, setPasswordValid] = useState(true);

    const [formIsValid, setFormIsValid] = useState(false);

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: "", isValid: null});
    const [emailState, dispatchEmail] = useReducer(emailReducer, {value: "", isValid: null});

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
    }, [emailIsValid, passwordIsValid]); // setFormIsValid is not neccessary to add here as it is something that does not change


    const loginHandler = (e) => {
        e.preventDefault();
        if(formIsValid) {
            authContext.onLogin(emailState.value, passwordState.value);
        } else if(!emailIsValid) {
            // is the email invalid, it is the first input on the form
            emailInputRef.current.focus();
        } else {
            // password invalid on submit attempt and show it is invalid
            passwordInputRef.current.focus();
        }
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
                    <Input
                        ref={emailInputRef}
                        id="email"
                        label="Email" type="email"
                        isValid={!emailIsValid}
                        value={emailState.value.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}/>
                </div>
                <div className="row">
                    <Input
                        ref={passwordInputRef}
                        id="password"
                        label="Password" type="password"
                        isValid={!passwordIsValid}
                        value={passwordState.value.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}/>
                </div>
                <button
                    className="btn">Login</button>
            </form>
        </div>
    )
}

export default LoginForm;