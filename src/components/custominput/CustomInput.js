import React, {useState} from 'react';
import {useField} from "formik";
import './customInput.css';


function CustomInput({label,...props}) {
    const [field,meta] = useField(props);


    return (
        <div className={"input-container"}>
            <input className = {  ` ${meta.touched && meta.error ? "input-error" : ""} input `} {...field} {...props} />
            {meta.touched && meta.error &&  <div className={"error"} > {meta.error} </div> }
        </div>
    );
}

export default CustomInput;