import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { backendUrl } from '../../auth';
import { toast } from 'react-toastify';
import './Registeration.css';

const ErrorChecker = (values) => {
  let errors = {};

  // Username Validation
  values.username = values.username.trim();
  if(!values.username) {
    errors.username = 'Required';
  } else if(values.username.search(/[^a-zA-Z0-9-]/g) !== -1) {
    errors.username = 'Only alphanumeric and hypen allowed';
  } else if(values.username.length > 30) {
    errors.username = "Too big, only 30 characters allowed";
  } else if(['admin', 'god'].includes(values.username)) {
    errors.username = 'Nice Try :p';
  }

  // Email Validation
  values.email = values.email.trim();
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  // Password Validation
  values.password = values.password.trim();
  if(!values.password) {
    errors.password = 'Required';
  } else if(values.password.search(/[^a-zA-Z0-9-_@#$]/g) !== -1) {
    errors.password = 'Only alphanumeric and _ - @ # $';
  } else if(values.password.length > 40) {
    errors.password = "Too big, only 40 characters allowed";
  }

  // Captcha Validation
  values.captcha = values.captcha.trim();
  if(!values.captcha) {
    errors.captcha = 'Required';
  }

  return errors;
}

const SignupFormLayout = ({ isSubmitting, animationToggle, setFieldValue }) => (
  <div className="formContent registeration">
    <h2 className="active"> SignUp </h2>
    <Form>
      <Field type="text" className={`${animationToggle} fadeIn-second`} 
        name="username" placeholder="Username" />
      <ErrorMessage name="username" component="div" />
      <Field type="email" className={`${animationToggle} fadeIn-third`} 
        name="email" placeholder="Email" />
      <ErrorMessage name="email" component="div" />
      <Field type="password" className={`${animationToggle} fadeIn-fourth`} 
        name="password" placeholder="Password" />
      <ErrorMessage name="password" component="div" />
      <ReCAPTCHA
        className="captcha-style"
        sitekey="6LdSZqMUAAAAANrFaG3t7bf5RRb-gz6-DgbEGoQO"
        name="captcha"
        onChange={(val) => setFieldValue('captcha', val)} />
      <ErrorMessage name="captcha" component="div" />
      <button type="submit" className={`button button-large ${animationToggle} fadeIn-fourth`} 
        disabled={isSubmitting}>
          Submit
      </button>
    </Form>
    <div className="formFooter">
      <a className="underlineHover" href="#login">Already a user? Login</a>
    </div>
  </div>
)

const SignupForm = (props) => {
  const animationToggle = props.inView ? 'fadeIn' : 'hidden';
  return (
  <Formik
    initialValues={{ username: '', email: '', password: '', captcha: '' }}
    validate={ErrorChecker}
    onSubmit={(values, { setSubmitting }) => {
      fetch(`${backendUrl()}/signup`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(data => {
        if(data['success']) {
          toast.success('Registeration successful, now you can Login');
        } else {
          toast.error(`Error: ${data.msg}`);
        }
        setSubmitting(false)
      })
      .catch(err => {
        toast.error('Something went wrong, can be an issue with the internet');  
        setSubmitting(false)
      });
    }}
    render={ props => <SignupFormLayout animationToggle={animationToggle} {...props} 
      setFieldValue={props.setFieldValue} /> }
  />
)};

export default SignupForm;
