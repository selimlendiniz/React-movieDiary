import * as Yup from "yup";

export const SignUpValidationSchemas = Yup.object().shape({
    email:Yup.string()
        .email("Please enter a valid email")
        .required("Required"),
    username:Yup.string().required("Required"),
    password:Yup.string().required("Required"),
    fullName: Yup.string().required("Required")
})