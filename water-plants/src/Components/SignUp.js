import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
const UserForm = ({ values, errors, touched, status }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log("status has changed", status);
    status && setUsers(users => [...users, status]);
  }, [status]);
  return (
    <div className="form">
      <Form className="Sign">
        <h2 className="signup">Sign Up</h2>
        <div className="signupLabels">
        <label htmlFor="username">
          Username
          <Field id="username" type="text" name="username" placeholder="Your username" />
          {touched.username && errors.username && (
            <p className="errors">{errors.username}</p>
          )}
        </label>
        <label htmlFor="phone">
          Phone Number
          <Field id="phone" type="text" name="phone" placeholder="Your phone number" />
          {touched.phone && errors.phone && (
            <p className="errors">{errors.phone}</p>
          )}
        </label>
        <label htmlFor="email">
          E-mail
          <Field id="email" type="text" name="email" placeholder="Your email address" />
          {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
          )}
        </label>


        <label htmlFor="password">
          Password
          <Field id="password" type="text" name="password" placeholder="Enter password"/> 
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        </label>
        <label htmlFor="repassword">
          Retype Password
        <Field id="repassword" type="text" name="repassword" placeholder="Retype Password" />
          {touched.repassword && errors.repassword && (
            <p className="errors">{errors.repassword}</p>
          )}
        </label>
        </div>
        {/* <div className="termsBox">
          <Field type="checkbox" name="terms" checked={values.terms} />
          <span className="checkmark" />
          <p>By checking this box, you agree to our Terms of Service.</p>
        </div> */}
        <button type="submit">Sign Up</button>
      </Form>
    </div>
  );
};
const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    return {
      username: props.username || "",
      password: props.password || "",
      phone: props.phone || "",
      email: props.email || "",
    };
  },
  // Declare shape and requirement of values object (form state )
  validationSchema: Yup.object().shape({
    // passing a string in required makes a custom inline error msg
    username: Yup.string().required("Create Username"),
    password: Yup.string().required("Create Password"),
    repassword: Yup.string().required("Re-Enter Password"),
    phone: Yup.string().required("Enter Phone Number"),
    email: Yup.string().required("Enter email address")
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://wmpbackend.herokuapp.com/api/auth/register", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);
export default FormikUserForm;