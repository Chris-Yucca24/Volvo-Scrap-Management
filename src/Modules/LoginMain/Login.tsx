import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LogMain from "../../assets/image-assets/BLOCK_RECORD.svg";
import BusMain from "../../assets/image-assets/BusMain.svg";
import LogoImage from "../../assets/image-assets/Main-logo.svg";

import "../../styles/style.css";

const LoginPage = () => {

  const navigate = useNavigate();

  /* Login States */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* Forgot Password States */
  const [showResetPassword, setShowResetPassword] = useState(false);

  const [resetPassword, setResetPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [storedEmail] = useState("admin1212@gmail.com");
  const [storedPassword, setStoredPassword] = useState(
    localStorage.getItem("storedPassword") || "admin123");

  /* Login Function */
  const handleLogin = () => {

    if (
      email === storedEmail &&
      password === storedPassword
    ) {
      navigate("/admin");
    }
    else {
      alert("Invalid credentials! Try again");
    }

  };

  /* Reset Password Function */
  const handleResetPassword = () => {

    if (
      resetPassword === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (resetPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setStoredPassword(resetPassword);

    localStorage.setItem("storedPassword", resetPassword);

    alert("Password Reset Successful");

    setShowResetPassword(false);

    setResetPassword("");
    setConfirmPassword("");

  };

  return (
    <div className="login-main">

      <div className="log-body">

        {/* Background Image */}
        <img
          src={LogMain}
          alt="Login Visual"
          className="log-main-image"
        />

        <div className="body-log-content">

          {/* Left Side - Form */}
          <div className="login-form-section">

            <div className="login-form-card">

              {/* Logo */}
              <img
                src={LogoImage}
                alt="Logo"
                className="login-card-logo"
              />

              {
                !showResetPassword ? (

                  <>
                    {/* Header */}
                    <h2 className="login-header">
                      Login
                    </h2>

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
                      />

                    </div>

                    {/* Password */}
                    <div className="input-field">

                      <label>Password</label>

                      <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) =>
                          setPassword(e.target.value)
                        }
                      />

                      <span
                        className="forgot-password"
                        onClick={() =>
                          setShowResetPassword(true)
                        }
                      >
                        Forgot Password?
                      </span>

                    </div>

                    {/* Login Button */}
                    <div className="button-login-section">

                      <button
                        className="login-button"
                        onClick={handleLogin}
                      >
                        Login
                      </button>

                    </div>
                  </>

                ) : (

                  <>
                    {/* Reset Password Header */}
                    <h2 className="login-header">
                      Set New Password
                    </h2>

                    {/* New Password */}
                    <div className="input-field">

                      <label>New Password</label>

                      <input
                        type="password"
                        placeholder="Enter New Password"
                        value={resetPassword}
                        onChange={(e) =>
                          setResetPassword(e.target.value)
                        }
                      />

                    </div>

                    {/* Confirm Password */}
                    <div className="input-field">

                      <label>Confirm Password</label>

                      <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                      />

                    </div>

                    {/* Reset Button */}
                    <div className="button-login-section">

                      <button
                        className="login-button"
                        onClick={handleResetPassword}
                      >
                        Reset Password
                      </button>

                    </div>

                    {/* Back to Login */}
                    <span
                      className="forgot-password"
                      onClick={() =>
                        setShowResetPassword(false)
                      }
                    >
                      Back to Login
                    </span>
                  </>
                )
              }

            </div>

          </div>

          {/* Right Side - Bus Image */}
          <div className="login-image-section">

            <img
              src={BusMain}
              alt="Bus Visual"
              className="bus-image-main"
            />

          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="log-footer"></div>

    </div>
  );
};

export default LoginPage;