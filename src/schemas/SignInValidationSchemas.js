import * as Yup from "yup";
import {useSelector} from "react-redux";



export const SignInValidationSchemas = Yup.object().shape({
    email:Yup.string()
        .email("Please enter a valid email")
        .required("Required"),
    password:Yup.string().required("Required"),
})