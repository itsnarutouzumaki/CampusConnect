import React, { useState } from 'react';
import './LoginSignup.css'; // Import your CSS file

const LoginSignupForm = () => {
  const [isSignupActive, setIsSignupActive] = useState(false);

  const handleToggleForm = () => {
    setIsSignupActive(!isSignupActive);
  };

  return (
    <div className="flex justify-center align-middle m-4">
    <section className={`wrapper ${isSignupActive ? 'active' : ''}`}>
      <div className="form signup">
        <header onClick={handleToggleForm}>Signup</header>
        <form action="#">
          <input type="text" placeholder="Full name" required />
          <input type="text" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />
          <div className="checkbox">
            <input type="checkbox" id="signupCheck" required />
            <label htmlFor="signupCheck">I accept all terms & conditions</label>
          </div>
          <input type="submit" value="Signup" />
        </form>
      </div>

      <div className="form login">
        <header onClick={handleToggleForm}>Login</header>
        <form action="#">
          <input type="text" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />
          <a href="#">Forgot password?</a>
          <input type="submit" value="Login" />
        </form>
      </div>
    </section>
    </div>
  );
};

export default LoginSignupForm;
