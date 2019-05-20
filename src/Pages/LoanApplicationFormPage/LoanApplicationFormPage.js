import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Persist } from 'formik-persist';
import { backendUrl } from '../../auth';
import { toast } from 'react-toastify';
import FormNavigationControl from './FormNavigationControl/FormNavigationControl';
import './LoanApplicationFormPage.css';

const ErrorChecker = (values) => {
  let errors = {};

  // First Name Validation
  values.firstname = values.firstname.trim();
  if (!values.firstname) {
    errors.firstname = 'Required';
  } else if (values.firstname.search(/[^a-zA-Z]/g) !== -1) {
    errors.firstname = 'Only alphabets can be used';
  } else if (values.firstname.length > 30) {
    errors.firstname = "Too big, only 30 characters allowed";
  }

  // Last Name Validation
  values.lastname = values.lastname.trim();
  if (!values.lastname) {
    errors.lastname = 'Required';
  } else if (values.lastname.search(/[^a-zA-Z]/g) !== -1) {
    errors.lastname = 'Only alphabets can be used';
  } else if (values.lastname.length > 30) {
    errors.lastname = "Too big, only 30 characters allowed";
  }

  // Mobile Number Validation
  values.mobile = values.mobile.trim();
  if (!values.mobile) {
    errors.mobile = 'Required';
  } else if (values.mobile.search(/[^+0-9]/g) !== -1) {
    errors.mobile = 'Invalid Number';
  } else if (values.mobile.length > 13) {
    errors.mobile = "Invalid Number, too long";
  }

  // Email Validation
  values.email = values.email.trim();
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  // Address Validation
  values.address = values.address.trim();
  if (!values.address) {
    errors.address = 'Required';
  } else if (values.address.search(/[^a-zA-Z0-9- ]/g) !== -1) {
    errors.address = 'Only alphanumeric is allowed';
  }

  // Gender Validation
  values.gender = values.gender.trim();
  if (!values.gender) {
    errors.gender = 'Required';
  } else if (!['male', 'female', 'other'].includes(values.gender)) {
    errors.gender = 'Invalid gender, what are you doing out there';
  }

  // Date of Birth Validation  
  values.date = values.date.trim();
  if (!values.date) {
    errors.date = 'Required';
  } else if (values.date.search(/[^0-9]/g) !== -1) {
    errors.date = 'Only numbers is allowed';
  } else if (parseInt(values.date) < 1 || parseInt(values.date) > 31) {
    errors.date = 'Please Pick a value between 1 and 31';
  }

  // Month of Birth Validation
  values.month = values.month.trim();
  if (!values.month) {
    errors.month = 'Required';
  } else if (values.month.search(/[^0-9]/g) !== -1) {
    errors.month = 'Only numbers is allowed';
  } else if (parseInt(values.month) < 1 || parseInt(values.month) > 12) {
    errors.month = 'Please Pick a value between 1 and 12';
  }

  // Year Validation 
  values.year = values.year.trim();
  if (!values.year) {
    errors.year = 'Required';
  } else if (values.year.search(/[^0-9]/g) !== -1) {
    errors.year = 'Only numbers is allowed';
  } else if (values.year.length !== 4 || isNaN(parseInt(values.year))) {
    errors.year = 'Are you sure about that';
  } else if (new Date(values.year) > new Date()) {
    errors.year = 'Hahaha very funny !!!';
  }

  // Annual Income Validation 
  values.annualIncome = values.annualIncome.trim();
  if (!values.annualIncome) {
    errors.annualIncome = 'Required';
  } else if (values.annualIncome.search(/[^0-9]/g) !== -1) {
    errors.annualIncome = 'Only numbers is allowed';
  }

  // Loan Amount Required Validation 
  values.loanAmountRequired = values.loanAmountRequired.trim();
  if (!values.loanAmountRequired) {
    errors.loanAmountRequired = 'Required';
  } else if (values.loanAmountRequired.search(/[^0-9]/g) !== -1) {
    errors.loanAmountRequired = 'Only numbers is allowed';
  }

  // Tenure Validation 
  values.tenure = values.tenure.trim();
  if (!values.tenure) {
    errors.tenure = 'Required';
  } else if (values.tenure.search(/[^0-9]/g) !== -1) {
    errors.tenure = 'Only numbers is allowed';
  }

  return errors;
}

const FormLayout = ({ isSubmitting, toggleInViewPart, isVisible, values, errors }) => (
  <div className="formContent fadeIn fadeIn-first">
    <h2 className="active"> Loan Application Form </h2>
    <Form>
      <div id="firstStepLoanForm" className={isVisible.call(this, 1)}>
        <Field type="text" className="fadeIn fadeIn-second"
          name="firstname" placeholder="First Name" />
        <ErrorMessage name="firstname" component="div" />

        <Field type="text" className="fadeIn fadeIn-second"
          name="lastname" placeholder="Last Name" />
        <ErrorMessage name="lastname" component="div" />

        <Field type="text" className="fadeIn fadeIn-second"
          name="mobile" placeholder="Mobile Number" />
        <ErrorMessage name="mobile" component="div" />

        <Field type="email" className="fadeIn fadeIn-second"
          name="email" placeholder="Email" />
        <ErrorMessage name="email" component="div" />

        <Field type="text" className="fadeIn fadeIn-second"
          name="address" placeholder="Address - Country" />
        <ErrorMessage name="address" component="div" />
        <FormNavigationControl fTitle="Next" bTitle="" bClass="button-hidden"
          fToggleFormView={() => {
            let t = ['firstname', 'lastname', 'mobile', 'email', 'address'].some(el => {
              return Object.keys(errors).includes(el);
            });
            if (t) {
              toast('You need to provide valid input');
              return;
            };
            // if(Object.keys(errors).length > 0) return;
            errors = {};
            toggleInViewPart(2);
          }} />
      </div>
      <div id="secondStepLoanForm" className={isVisible.call(this, 2)}>
        <div className="container-application-form fadeIn fadeIn-second">
          <h2>Choose your Gender</h2>
          <ul>
            <li>
              <Field type="radio" id="f-option" name="gender" value="male" checked={values.gender === "male"} />
              <label htmlFor="f-option">Male</label>
              <div className="check"><div className="inside"></div></div>
            </li>

            <li>
              <Field type="radio" id="s-option" name="gender" value="female" checked={values.gender === "female"} />
              <label htmlFor="s-option">Female</label>
              <div className="check"><div className="inside"></div></div>
            </li>

            <li>
              <Field type="radio" id="t-option" name="gender" value="other" checked={values.gender === "other"} />
              <label htmlFor="t-option">Other</label>
              <div className="check"><div className="inside"></div></div>
            </li>
          </ul>
        </div>
        <ErrorMessage name="gender" component="div" />
        <div className="form-group fadeIn fadeIn-second">
          <label htmlFor="DOB" className="label">Enter Date of Birth</label>
          <Field type="text" className="fadeIn-second"
            name="date" placeholder="Date Numeric (1 - 31)" />
          <ErrorMessage name="date" component="div" />
          <Field type="text" className="fadeIn-second"
            name="month" placeholder="Month Numeric (1 - 12)" />
          <ErrorMessage name="month" component="div" />
          <Field type="text" className="fadeIn-second"
            name="year" placeholder="Year Numeric (e.g 1998)" />
          <ErrorMessage name="year" component="div" />
          <FormNavigationControl fTitle="Next" bTitle="Back"
            fToggleFormView={() => {
              let t = ['gender', 'date', 'month', 'year'].some(el => {
                return Object.keys(errors).includes(el);
              });
              if (t) {
                toast('You need to provide valid input');
                return;
              };
              // if(Object.keys(errors).length > 0) return;
              errors = {};
              toggleInViewPart(3);
            }}
            bToggleFormView={() => {
              toggleInViewPart(1);
            }} />
        </div>
      </div>
      <div id="thirdStepLoanForm" className={isVisible.call(this, 3)}>
        <Field type="text" className="fadeIn fadeIn-first"
          name="annualIncome" placeholder="Your Annual Income" />
        <ErrorMessage name="annualIncome" component="div" />

        <Field type="text" className="fadeIn fadeIn-second"
          name="loanAmountRequired" placeholder="Loan Amount Required" />
        <ErrorMessage name="loanAmountRequired" component="div" />

        <Field type="text" className="fadeIn fadeIn-second"
          name="tenure" placeholder="Tenure(In Days)" />
        <ErrorMessage name="tenure" component="div" />

        <button type="submit" className={`button button-large fadeIn-third`}
          disabled={isSubmitting}>
          Apply
        </button>

        <Persist name="loan-form" />
      </div>
    </Form>
  </div>
)

class LoanApplicationFormPage extends React.Component {

  state = {
    inViewPart: 1,
  }

  componentDidMount() {
    if (this.props.location.state) {
      localStorage.setItem('loan-form-id', this.props.location.state.form_id)
    }
  }

  toggleInViewPart = (num) => {
    this.setState({
      inViewPart: num
    });
  }

  isVisible = (num) => {
    if (num === this.state.inViewPart) {
      return 'in-view';
    }
    return 'off-view';
  }

  render() {
    return (
      <Formik
        initialValues={
          {
            firstname: '',
            lastname: '',
            mobile: '',
            email: '',
            address: '',
            gender: '',
            date: '',
            month: '',
            year: '',
            annualIncome: '',
            loanAmountRequired: '',
            tenure: ''
          }
        }
        validate={ErrorChecker}
        onSubmit={(values, { setSubmitting }) => {
          let formId = localStorage.getItem('loan-form-id');
          if (formId) {
            fetch(`${backendUrl()}/loan/update`, {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                'data': localStorage.getItem('loan-form'),
                'status': 1,
                'id': formId
              })
            })
              .then(res => res.json())
              .then(data => {
                if (data['success']) {
                  toast.info('Data Saved Successfully', {
                    position: toast.POSITION.BOTTOM_CENTER
                  });
                  if (data['token']) {
                    localStorage.setItem('token', data['token']);
                  }
                } else {
                  toast.info(`Error(${data['msg']}) in saving data, you have been logged out`, {
                    position: toast.POSITION.BOTTOM_CENTER
                  });
                }
              })
              .catch(err => {
                toast('Something went wrong, Internet might be down');
              });
          } else {
            fetch(`${backendUrl()}/loan/apply`, {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                'data': localStorage.getItem('loan-form'),
                'status': 1,
                'user_id': localStorage.getItem('user_id')
              })
            })
              .then(res => res.json())
              .then(data => {
                if (data['success']) {
                  toast.success('Data Saved Successfully');
                  if (data['token']) {
                    localStorage.setItem('token', data['token']);
                  }
                  setSubmitting(false);
                  this.props.history.push('/home');
                } else {
                  toast.info(`Error(${data['msg']}) in saving data`);
                  setSubmitting(false);
                }
              })
              .catch(err => {
                toast.error('Something went wrong, please check your connection');
                setSubmitting(false);
              });
          }
        }}

        render={props => <FormLayout toggleInViewPart={this.toggleInViewPart}
          isVisible={this.isVisible} {...props} />}
      />
    )
  }
};


export default LoanApplicationFormPage;
