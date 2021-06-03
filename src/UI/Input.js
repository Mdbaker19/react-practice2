import React, { useRef, useImperativeHandle } from 'react';

// using props over context as the information is different per input, more reusable
// this input is taking a ref prop in the parent element container
const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();

    // useEffect( () => {
    //     inputRef.current.focus();
    // }, []); // would focus on the password input on refresh of page

    const activate = () => {
        inputRef.current.focus();
    }; // used in the imparative handler, a build in method of the input component in the browser api, input focus

    useImperativeHandle( ref, () => {
        return {
            focus: activate
        }
    });

    return (
        <div className={`${props.isValid === false ? "input-field col s12": "error input-field col s12"}`}>
            <input
                ref={inputRef}
                onBlur={props.onBlur}
                value={props.value}
                onChange={props.onChange}
                id={props.id}
                type={props.type}
                className="validate" />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    )
})

export default Input;