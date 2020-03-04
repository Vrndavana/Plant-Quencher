import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
const LoginForm = ({ values, errors, touched, status }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log("status has changed", status);
    status && setUsers(users => [...users, status]);
  }, [status]);
  return (
    <div className="form">
      <Form className="Log">
        <h1 className="login">Login</h1>
        <div className="loginLabels">
        <label htmlFor="name">
          Name
          <Field id="name" type="text" name="name" placeholder="Your name" />
          {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
        </label>
        <label htmlFor="number">
          Phone Number
          <Field id="number" type="text" name="number" placeholder="Your phone number" />
          {touched.number && errors.number && (
            <p className="errors">{errors.number}</p>
          )}
        </label>
        <label htmlFor="password">
          Password
          <Field id="password" name="password" placeholder="Enter password"/>
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        </label>
        </div>
        <button type="submit">Login</button>
        <br></br>
        <br></br>
        <a href="https://soundcloud.com/v-hines"> Forgot Password?</a>
      </Form>
    </div>
  );
};
const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || "",
      number: props.number || "",
      password: props.password || "",
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    number: Yup.number().required("Please enter your number"),
    password: Yup.string().required("Please enter your password")
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(LoginForm);
export default FormikUserForm;