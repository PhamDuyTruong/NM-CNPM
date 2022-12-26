import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'
import Swal from "sweetalert2";
function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const handleResetPassword = (e) => {
        e.preventDefault();
    }
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
              <h2>Reset Password</h2>
            </div>
            <form onSubmit={handleResetPassword}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Enter Your Confirm Password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 d-grid">
                <button type="submit" className="btn btn-primary">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ResetPassword