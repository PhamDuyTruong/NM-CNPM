import React from "react";
import {Link} from 'react-router-dom'

function ForgotPassword() {
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
              <form>
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
