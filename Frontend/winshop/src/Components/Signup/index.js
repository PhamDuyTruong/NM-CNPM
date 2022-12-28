import React, {useState} from 'react';
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import zxcvbn from 'zxcvbn';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import SignupImage from '../../assets/images/registration-form.jpg';
import {registerUser} from '../../actions/AuthAction'

const PasswordStr = props => {
    var strColor;
    var strWidth;
  
    switch (props.score) {
      case 1:
        strColor = 'red';
        strWidth = '20%';
        break;
      case 2:
        strColor = 'orange';
        strWidth = '40%';
        break;
      case 3:
        strColor = 'yellow';
        strWidth = '60%';
        break;
      case 4:
        strColor = '#5cff47';
        strWidth = '80%';
        break;
      case 5:
        strColor = 'green';
        strWidth = '100%';
        break;
      default:
    }
  
    var style = { backgroundColor: strColor, height: '5px', width: strWidth, transition: 'all 300ms ease-in-out' }
  
    return (
    <div>
      <p className="pwStrWeak">weak</p>
      <p className="pwStrStrong">strong</p>
      <div style={style} />
    </div> 
    );
  
  };

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

function Signup(props) {
    
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
      const dispatch = useDispatch();

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
            .required('Email is required')
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
    
      const handleSubmit = (value) => {
        // Code in server goes here
        const data = {
          username: value.username,
          email: value.email,
          phone: value.phone,
          password: value.password,
        }
        dispatch(registerUser(data));
      }


  return (
    <div className="signup-inner" style={{marginTop: "70px"}}>
    <div className="image-holder">
      <img src={SignupImage} alt="sign-up" className='signup-img' />
    </div>
    <div className='signup-form'>
      <h3 style={{textAlign: "center", marginBottom: "15px"}}>Sign Up</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (

          <Form>
            <div className="form-holder singup-active">
              <Field
                name="username"
                type="text"
                className={
                  'signup-form-control' +
                  (errors.username && touched.username ? ' is-invalid' : '')
                }
                placeholder="Input username"
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
                  'signup-form-control' +
                  (errors.email && touched.email ? ' is-invalid' : '')
                }
                placeholder="Input email"
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
                  'signup-form-control' +
                  (errors.phone && touched.phone ? ' is-invalid' : '')
                }
                placeholder="Input phone"
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
                  'signup-form-control' +
                  (errors.password && touched.password ? ' is-invalid' : '')
                }
                placeholder="Input password"
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
                  'signup-form-control' +
                  (errors.confirmPassword && touched.confirmPassword
                    ? ' is-invalid'
                    : '')
                }
                placeholder="Input re-password"
                onKeyUp={handleChange}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div class="footer" >
              <div className="singup-checkbox" style={{marginBottom: "10px"}}>
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
                    style={{marginRight: "5px"}}
                  />
                  I have read and agree to <a href="/term" style={{textDecoration: "none"}}>Terms & Conditions</a>
                  <span className="singup-checkmark"></span>
                  <ErrorMessage
                    name="acceptTerms"
                    component="div"
                    className="invalid-feedback accept"
                  />
                </label>
              </div>

              <div className="form-login">
                <button
                className='signup-submit'
                  type="submit">
                  Sign up
                </button>
                <button
                className='signup-forgot'
                //   onClick={resetForm}
                >
                 Reset
                </button>
              </div>

              <div className='redirect'>
                <p>Already Have account? <a href="/sign-in"  style={{textDecoration: "none"}}>Login</a></p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);

}

export default Signup