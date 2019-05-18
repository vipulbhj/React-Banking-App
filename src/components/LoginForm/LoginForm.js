import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import { login } from '../../auth';


const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email Required'),
  password: Yup.string()
    .min(6, 'Password too Short!')
    .max(30, 'Password too Long!')
    .required('Password Required')
});

const FormLayout = ({ isSubmitting, animationToggle }) => (
  <div className="formContent">
    <h2 className="active"> Log In </h2>
    <Form>
      <Field type="email" className={`${animationToggle} fadeIn-second`}
        name="email" placeholder="Email" />
      <ErrorMessage name="email" component="div" />
      <Field type="password" className={`${animationToggle} fadeIn-second`} 
        name="password" placeholder="Password" />
      <button type="submit" className={`button button-large ${animationToggle} fadeIn-third`} 
        disabled={isSubmitting}>
          Login
      </button>
    </Form>
    <div className="formFooter">
      <a className="underlineHover" href="#signup">Register</a>
    </div>
  </div>
)

const LoginForm = (props) => {
  const animationToggle = props.inView ? 'fadeIn' : 'hidden';
  return (
  <Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={LoginSchema}
    onSubmit={(values, { setSubmitting }) => {
      login(values, setSubmitting, props.history);
    }}
    render={props => <FormLayout animationToggle={animationToggle} {...props} />}
  />
)};

export default withRouter(LoginForm);
