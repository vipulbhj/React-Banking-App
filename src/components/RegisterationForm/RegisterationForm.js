import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Registeration.css';

const FormLayout = ({ isSubmitting, animationToggle }) => (
  <div id="signup" className="formContent">
    <h2 className="active"> Registeration </h2>
    <Form>
      <Field type="text" className={`${animationToggle} fadeIn-second`} 
        name="username" placeholder="Username" />
      <ErrorMessage name="username" component="div" />
      <Field type="email" className={`${animationToggle} fadeIn-third`} 
        name="email" placeholder="Email" />
      <ErrorMessage name="email" component="div" />
      <Field type="password" className={`${animationToggle} fadeIn-fourth`} 
        name="password" placeholder="password" />
      <ErrorMessage name="password" component="div" />
      <ReCAPTCHA
        className="captcha-style"
        sitekey="6LdSZqMUAAAAANrFaG3t7bf5RRb-gz6-DgbEGoQO"
        onChange={(value) => console.log(value)}
      />
      <Field type="submit" className={`${animationToggle} fadeIn-fourth`} 
        value="Signup" disabled={isSubmitting} />
    </Form>
    <div className="formFooter">
      <a className="underlineHover" href="#login">Already a user? Login</a>
    </div>
  </div>
)

const LoginForm = (props) => {
  const animationToggle = props.inView ? 'fadeIn' : 'hidden';
  return (
  <Formik
    initialValues={{ username: '', email: '', password: '' }}
    validate={values => {
      let errors = {};
      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be more than 6 characters';
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
    render={ props => <FormLayout animationToggle={animationToggle} {...props} />}
  />
)};

export default LoginForm;
