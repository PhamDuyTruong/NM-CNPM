import React, {useState} from 'react';
import "./styles.css";
import {useHistory} from 'react-router-dom'
import bgSignin from '../../assets/images/bgsignin.jpg';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../actions/AuthAction';

function Signin(props) {
  const initialValues = {
    username: '',
    password: '',
  };
  const [user, setUser] = useState(props.user || {});
  const {userLogin} = useSelector((state) => state.login);
    const history = useHistory();
    const dispatch = useDispatch();
    const userInfo = JSON.parse(localStorage.getItem("user"))
    const validationSchema = () => {
      return Yup.object().shape({
        username: Yup.string()
          .required('Username is required')
          .min(6, 'Username must be at least 6 characters')
          .max(20, 'Username must not exceed 20 characters'),
        password: Yup.string()
          .required('Password is required')
          .min(5, 'Password must be at least 6 characters')
          .max(40, 'Password must not exceed 40 characters'),
      });
    };
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setUser(user => ({
        ...user,
        [name]: value
      }));
    }
    const handleSubmit = (value)   => {
        const data = {
          username: value.username,
          password: value.password
        }
        dispatch(loginUser(data));
        history.push("/")
        if(userLogin.length === 0){
          history.push("/sign-in")
        }
    };

    if(userInfo){
      history.push("/");
    }
  return (
    <div className="SignIn">
     
    <div className="signin-label">
      <div className="label_img">
        <img className="label_img" src={bgSignin} alt="WinShop"/>
      </div>
      
    </div>

    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (

          <Form>
            <h3 style={{textAlign: "center", marginBottom: "15px"}}>Sign in</h3>
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
                name="password"
                type="password"
                className={
                  'signup-form-control' +
                  (errors.password && touched.password ? ' is-invalid' : '')
                }
                placeholder="Input password"
                onKeyUp={handleChange}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-login">
                <button
                className='signup-submit'
                  type="submit">
                  Sign in
                </button>
            </div>
            <a href='#' style={{textDecoration: "none", marginTop: "20px"}}>Forget Password ?</a>
            <div>
               <p >Don't have account ? <span><a href='/sign-up' style={{textDecoration: "none"}}>Sign in</a></span></p>
            </div>
          </Form>
        )}
        </Formik>
  </div>
  )
}

export default Signin