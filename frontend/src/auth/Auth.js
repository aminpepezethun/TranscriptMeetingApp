import React, { useState } from "react";
import AuthForm from "./AuthForm"; // Import the hook, not as './AuthForm'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {
    form,
    error,
    success,
    handleChange,
    handleSubmit,
  } = AuthForm(isLogin);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <div className="d-flex justify-content-center mb-4">
              {/* Login and Signup button*/}
              <button
                className={`btn ${isLogin ? "btn-primary" : "btn-outline-primary"} me-2`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`btn ${!isLogin ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setIsLogin(false)}
              >
                Signup
              </button>
            </div>
            {/* Alert display for form submission */}
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
              <h3 className="mb-3">{isLogin ? "Login" : "Signup"}</h3>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {!isLogin && (
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <button type="submit" className="btn btn-primary w-100">
                {isLogin ? "Login" : "Signup"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;