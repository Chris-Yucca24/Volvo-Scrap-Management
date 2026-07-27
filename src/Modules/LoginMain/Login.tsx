import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/style.css";

const LoginPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleLogin = () => {

    if (email.trim() !== "") {
      navigate("/view");
    } 
    else {
      alert("Please enter your email");
    }

  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };


  return (
    <div className="login-main">

      <div className="log-body">

        <div className="body-log-content">

          {/* Left Side - Form */}
          <div className="login-form-section">

            <div className="login-form-card">

              <h2 className="login-header">
                Welcome Back
              </h2>

              <p>
                Sign in to continue to document management
              </p>


              {/* Email */}
              <div className="input-field">

                <label>Email</label>

                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                />

              </div>


              {/* Login Button */}
              <div className="button-login-section">

                <button
                  className="login-button"
                  onClick={handleLogin}
                >
                  Sign in with SSO
                </button>


                <p>
                  By continuing, you agree to our Terms of Service and 
                  <br />
                  Privacy Policy
                </p>

              </div>


            </div>

          </div>


          {/* Right Side */}
          <div className="login-image-section">

          </div>


        </div>

      </div>


    </div>
  );
};

export default LoginPage;