import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Registeration.css';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Username Too Short!')
    .max(30, 'Username Too Long!')
    .required('Username Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email Required'),
  password: Yup.string()
    .min(6, 'Password too Short!')
    .max(30, 'Password too Long!')
    .required('Password Required'),
  captcha: Yup.string()
    .required()
});

const FormLayout = ({ isSubmitting, animationToggle, setFieldValue }) => (
  <div id="signup" className="formContent registeration">
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
        name="captcha"
        onChange={(val) => setFieldValue('captcha', val)} />
      <ErrorMessage name="captcha" component="div" />
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
    initialValues={{ username: '', email: '', password: '', captcha: '' }}
    validationSchema={SignupSchema}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
    render={ props => <FormLayout animationToggle={animationToggle} {...props} 
      setFieldValue={props.setFieldValue} /> }
  />
)};

export default LoginForm;
