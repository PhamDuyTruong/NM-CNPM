import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import PasswordStr from './PasswordStr';
import zxcvbn from 'zxcvbn';
import * as Yup from 'yup';
import $ from 'jquery';
import './style.css';
import SignUpImage from './images/registration-form-4.jpg'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

function App(props) {

  const initialValues = {
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  };

  const [user, setUser] = useState(props.user || {});
  const [score, setScore] = useState(props.score || 0);
  const [pwBtn, setPwBtn] = useState(props.pwBtn || 'show');
  const [type, setType] = useState(props.type || 'password');

  // constructor(props) {
  //   super(props);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.handleChange = this.handleChange.bind(this);
  //   this.pwHandleChange = this.pwHandleChange.bind(this);
  //   this.pwMask = this.pwMask.bind(this);


  //   this.state = {
  //     user: {
  //       username: '',
  //       email: '',
  //       phone: '',
  //       password: '',
  //       confirmPassword: '',
  //       acceptTerms: false,
  //     },
  //     score: 0,
  //     pwBtn: 'show',
  //     type: 'password'
  //   };
  // }

  const validationSchema = () => {
    return Yup.object().shape({
      username: Yup.string()
        .required('Username is required')
        .min(6, 'Username must be at least 6 characters')
        .max(20, 'Username must not exceed 20 characters'),
      phone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, "Phone number is too short")
        .max(10, "Phone number is too long"),
      email: Yup.string()
        .email('Email is invalid'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(40, 'Password must not exceed 40 characters'),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
      acceptTerms: Yup.bool()
        .oneOf([true], 'Accept Terms is required'),
    });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser(user => ({
      ...user,
      [name]: value
    }));
  }

  const pwHandleChange = (event) => {
    const { name, value } = event.target;

    setUser(user => ({
      ...user,
      [name]: value
    }));

    if (event.target.value === "") {
      setScore(0);
    } else {
      var pw = zxcvbn(event.target.value);
      setScore(pw.score + 1);
    }
  }

  const pwMask = (event) => {
    event.preventDefault();
    setType(type === "password" ? "input" : "password");
    setPwBtn(pwBtn === "show" ? "hide" : "show");
  }

  const resetFormData = () => {
    setUser({});
    setScore(0);
    setPwBtn("");
    setType("");
  }

  const handleSubmit = (data) => {
    // Code in server goes here
    console.log(JSON.stringify({ user: user, score: score, pwBtn: pwBtn, type: type }, null, 2));
  }


  return (
    <div className="inner">
      <div className="image-holder">
        <img src={SignUpImage} alt="" />
      </div>
      <div className='form'>
        <h3>Sign Up</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, resetForm }) => (

            <Form>
              <div className="form-holder active">
                <Field
                  name="username"
                  type="text"
                  className={
                    'form-control' +
                    (errors.username && touched.username ? ' is-invalid' : '')
                  }
                  placeholder="USERNAME"
                  onKeyUp={handleChange}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-holder">

                <Field
                  name="email"
                  type="email"
                  className={
                    'form-control' +
                    (errors.email && touched.email ? ' is-invalid' : '')
                  }
                  placeholder="E-MAIL"
                  onKeyUp={handleChange}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-holder">

                <Field
                  name="phone"
                  type="text"

                  className={
                    'form-control' +
                    (errors.phone && touched.phone ? ' is-invalid' : '')
                  }
                  placeholder="PHONE"
                  onKeyUp={handleChange}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-holder">

                <Field
                  name="password"
                  type={type}
                  className={
                    'form-control' +
                    (errors.password && touched.password ? ' is-invalid' : '')
                  }
                  placeholder="PASSWORD"
                  onKeyUp={pwHandleChange}

                />

                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className='pwStrRow'>
                {score >= 1 && <div>
                  <PasswordStr score={score} />
                  <button
                    className="btn btn-success my-2 pwBtn"
                    onClick={pwMask}
                  >{pwBtn}</button>
                </div>}
              </div>

              <div className="form-holder">

                <Field
                  name="confirmPassword"
                  type={type}
                  className={
                    'form-control' +
                    (errors.confirmPassword && touched.confirmPassword
                      ? ' is-invalid'
                      : '')
                  }
                  placeholder="RE-PASSWORD"
                  onKeyUp={handleChange}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div class="footer">
                <div className="checkbox">
                  <label>
                    <Field
                      name="acceptTerms"
                      type="checkbox"
                      className={
                        'form-check-input' +
                        (errors.acceptTerms && touched.acceptTerms
                          ? ' is-invalid'
                          : '')
                      }
                      onKeyUp={handleChange}
                    />
                    I have read and agree to <a href="#">Terms & Conditions</a>
                    <span className="checkmark"></span>
                    <ErrorMessage
                      name="acceptTerms"
                      component="div"
                      className="invalid-feedback accept"
                    />
                  </label>
                </div>

                <div className="form-login">
                  <button
                    type="submit">
                    Sign up
                  </button>
                  <button
                    type='reset'
                    onClick={resetForm}
                  >
                    Reset
                  </button>
                </div>

                <div className='redirect'>
                  <p>Already Have account? <a href="#">Login</a></p>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

$(function () {
  $('.form-holder').delegate("input", "focus", function () {
    $('.form-holder').removeClass("active");
    $(this).parent().addClass("active");
  })
})

export default App;
