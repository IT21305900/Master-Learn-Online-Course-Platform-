import React, { useState } from 'react';


const LoginUser = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(loginData);
  };

  return (
    <>
      <nav className="app-nav-bar"></nav>
      <section className="vh-100">
      <div className="heading-1-container">
        <h1 className='heading-1'>Sign in</h1>
        </div>
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
            </div>

            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={onSubmit}>

                {/* Email input */}
                <div className="form-outline mb-4">
                  <input type="email" id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid username" name="username" value={loginData.username} onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} />
                  <label className="form-label" htmlFor="form3Example3">Username</label>
                </div>

                {/* Password input */}
                <div className="form-outline mb-3">
                  <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" name="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                  <label className="form-label" htmlFor="form3Example4">Password</label>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  {/* Checkbox */}
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>

                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>
                </div>

              </form>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          {/* Copyright */}
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2020. All rights reserved.
          </div>
          {/* Copyright */}

          {/* Right */}
          <div>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-google"></i>
            </a>
            <a href="#!" className="text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          {/* Right */}
        </div>
      </section>
    </>
  );
};

export default LoginUser;
