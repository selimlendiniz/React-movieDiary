import React from 'react';
import {Form, Formik} from "formik";
import {SignUpValidationSchemas} from "../../schemas/SignUpValidationSchemas";
import CustomInput from "../../components/custominput/CustomInput";
import './signUpPage.css';
import videpBg from '../../assets/signUpBg4.mp4'
import logo from '../../assets/logotransparan.png'
import {signUp} from "../../config/firebase";



function SignUp(props) {

    const values = {
        email:'',
        password:'',
        fullName: '',
        username:'',
    }

    const handleSubmit = (values) => {
        signUp(values.name,values.email,values.password)
            .then(() => console.log("Basarili"))
            .catch((e) => console.log(e))
    }

    return (
        <>
            <video src={videpBg} autoPlay loop muted />
            <div className={"signUp-content"}>
            <div className={"container"}>


                <img className={"signUp-logo"} src={logo}/>
                <Formik
                    initialValues={values}
                    onSubmit={handleSubmit}
                    validationSchema={SignUpValidationSchemas}

                >



                    {(props) => (

                        <Form className={"form-container"}>
                            <CustomInput label={"Username"} name={"username"} type={"text"} placeholder={"Enter your username"} />
                            <CustomInput label={"Email"} name={"email"} type={"text"} placeholder={"Enter your email"} />
                            <CustomInput label={"Password"} name={"password"} type={"password"} placeholder={"Enter your password"} />
                            <CustomInput label={"Full Name"} name={"fullName"} type={"text"} placeholder={"Enter your Full Name"} />

                            <button className={"submit-button"} type={"submit"} >Submit</button>
                        </Form>

                    )}


                </Formik>

            </div>
            </div>
        </>
    );
}

export default SignUp;