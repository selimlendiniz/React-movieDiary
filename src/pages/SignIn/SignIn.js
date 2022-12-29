import React, {useState} from 'react';
import videoBg from '../../assets/signUpBg4.mp4'
import './signInPage.css'
import {Form, Formik} from "formik";
import CustomInput from "../../components/custominput/CustomInput";
import {signIn} from "../../config/firebase";
import {SignUpValidationSchemas} from "../../schemas/SignUpValidationSchemas";
import {useDispatch, useSelector} from "react-redux";
import {changeEmail, changeName, changePassword, login, register} from "../../redux/authSlice";
import * as events from "events";
import {SignInValidationSchemas} from "../../schemas/SignInValidationSchemas";
import logo from "../../assets/logotransparan.png";
import {Link as RouterLink, NavLink} from "react-router-dom";

function SignIn() {


    const values = {
        email:'',
        password:'',
    };

    const name =  useSelector(state => state.auth.name);
    const email =  useSelector(state => state.auth.email);
    const password =  useSelector(state => state.auth.password);
    const error = useSelector(state => state.auth.error);
    const isLoading = useSelector(state => state.auth.isLoading);

    const dispatch = useDispatch();




    const handleSubmit = (values) => {
        dispatch(login({email,password}))
    }

    const handleChanges = (event) => {
        switch (event.target.name){
            case "email":
                dispatch(changeEmail(event.target.value))
                break;
            case "password":
                dispatch(changePassword(event.target.value))
                break;
        }
    }




    return (
        <div className={"signIn-main"}>
            <video src={videoBg} autoPlay loop muted />
            <div className={"signIn-content"}>
                <div className={"signUp-container"}>

                    <img className={"signUp-logo"} src={logo} alt={"logo"}/>
                    {
                        error && <h4>{error}</h4>
                    }
                    <Formik initialValues={values}
                            onSubmit={handleSubmit}
                            validationSchema={SignInValidationSchemas}
                    >
                        {(props) => (
                        <Form
                            onChange={handleChanges}

                        >
                            <CustomInput label={"email"} name={"email"} type={"text"} placeholder={"Enter your email"} />
                            <CustomInput label={"password"} name={"password"} type={"password"} placeholder={"Enter your password"} />

                            <button className={"submit-button"} type={"submit"} disabled={isLoading} >{isLoading ? "Loading..." : "Sign in"}</button>
                            <NavLink to="../signUp" style={{color: "white"}}>
                                Don't have an account? Sign up
                            </NavLink>

                        </Form>
                        )}
                    </Formik>
                    </div>
            </div>


        </div>
    );
}

export default SignIn;