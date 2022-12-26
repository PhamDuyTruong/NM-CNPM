import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import {forgetPassword} from '../../actions/AuthAction'
import Swal from "sweetalert2";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const {loading, message, error} = useSelector((state)=> state.forgot);
  const dispatch = useDispatch();
  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email
    };
    dispatch(forgetPassword(data));
    setEmail("");
  };

  useEffect(() => {
    if(error){
      setEmail("");
      Swal.fire(
        "Error !!!"
      )
    }
    if(message){
      Swal.fire(message)
    }
  }, [message, error])

  return (
    <div className="container-fluid d-flex flex-column" style={{background: "#BFEAF5"}}>
      <div
        className="row align-items-center justify-content-center
  min-vh-100 g-0"
      >
        <div className="col-12 col-md-8 col-lg-4 border-top border-3 border-primary">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="mb-4">
                <h2>Forgot Password?</h2>
                <p className="my-2">
                  Enter your registered email ID to reset the password
                </p>
              </div>
              <form onSubmit={handleForgotPasswordSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 d-grid">
                  <button type="submit" className="btn btn-primary">
                    Reset Password
                  </button>
                </div>
                <span>
                  Don't have an account? <Link to="/sign-in"  style={{textDecoration: "none"}}>Sign in</Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
