import React from 'react';
import {useField} from "formik";
import './customInput.css';

function CustomInput({label,...props}) {
    const [field,meta] = useField(props);
    console.log("field",field);
    console.log("meta",meta);

    return (
        <div className={"input-container"}>
            <input className = {  ` ${meta.touched && meta.error ? "input-error" : ""} input `} {...field} {...props} />
            {meta.touched && meta.error &&  <div className={"error"} > {meta.error} </div> }
        </div>
    );
}

export default CustomInput;