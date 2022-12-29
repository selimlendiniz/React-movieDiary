import React from 'react';
import {Form, Formik} from "formik";
import {SignUpValidationSchemas} from "../../schemas/SignUpValidationSchemas";
import CustomInput from "../../components/custominput/CustomInput";
import './signUpPage.css';
import videoBg from '../../assets/signUpBg4.mp4'
import logo from '../../assets/logotransparan.png'
import {signUp} from "../../config/firebase";
import {useDispatch, useSelector} from "react-redux";
import {changeName,changeEmail,changePassword,register} from "../../redux/authSlice";
import {NavLink} from "react-router-dom";



function SignUp(props) {

    const name =  useSelector(state => state.auth.name);
    const email =  useSelector(state => state.auth.email);
    const password =  useSelector(state => state.auth.password);
    const error = useSelector(state => state.auth.error);
    const isLoading = useSelector(state => state.auth.isLoading);

    const dispatch = useDispatch();

    const values = {
        email:"",
        password: "",
        fullName: "",
        username:'',
    }


    const handleSubmit = (values) => {
        dispatch(register({name,email,password}))

    }

    const handleChanges = (event) => {
        switch (event.target.name){
            case "username":
                dispatch(changeName(event.target.value))
                break;
            case "email":
                dispatch(changeEmail(event.target.value))
                break;
            case "password":
                dispatch(changePassword(event.target.value))
                break;
        }
    }



    return (
        <>
            <video src={videoBg} autoPlay loop muted />
            <div className={"signUp-content"}>
            <div className={"signUp-container"}>

                <img className={"signUp-logo"} src={logo} alt={"logo"}/>
                {
                    error && <h4>{error}</h4>
                }
                <Formik
                    initialValues={values}
                    onSubmit={handleSubmit}
                    validationSchema={SignUpValidationSchemas}
                >

                    {(props) => (

                        <Form className={"form-container"} onChange={handleChanges}>
                            <CustomInput label={"Username"} name={"username"} type={"text"} placeholder={"Enter your username"} />
                            <CustomInput label={"Email"} name={"email"} type={"text"} placeholder={"Enter your email"} />
                            <CustomInput label={"Password"} name={"password"} type={"password"} placeholder={"Enter your password"} />
                            <CustomInput label={"Full Name"} name={"fullName"} type={"text"} placeholder={"Enter your Full Name"} />

                            <button className={"submit-button"} type={"submit"} disabled={isLoading}  >{isLoading ? "Loading..." : "Sign up"}</button>
                        </Form>


                    )}






                </Formik>

                <NavLink to="../signIn" style={{color: "white"}}>
                    Do have an account? Sign In
                </NavLink>

            </div>
            </div>
        </>
    );
}

export default SignUp;