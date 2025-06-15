import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ جلب redirect من URL
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    if (user) {
      const userData = JSON.parse(user);
      if (userData.isLoggedIn) {
        // ✅ لو فيه يوزر بالفعل، يرجعه لصفحة redirect بدل البروفايل
        navigate(redirect);
      }
    }
  }, [navigate, redirect]);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:5000/api/users/login", {
      email,
      password,
    });

    if (res.data.user && res.data.token) {
      const userData = {
        isLoggedIn: true,
        token: res.data.token,
        user: res.data.user,
      };
      localStorage.setItem("userInfo", JSON.stringify(userData));

      navigate(redirect);
    }
  } catch (error) {
    console.error("Login Error:", error);
    if (error.response?.data?.message) {
      setErrorMsg(error.response.data.message);
    } else {
      setErrorMsg("❌ Login failed. Please try again.");
    }
  }
};



  return (
    <>
      <div className="container Login my-5">
        <h1 className="TextLogin mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="FormLogin row g-3">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              className="inputLogin"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              className="inputLogin"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMsg && (
            <div className="col-md-6 offset-md-3 text-danger fw-bold text-center">
              {errorMsg}
            </div>
          )}

          <div className="text-center mt-3">
            <button className="btnLogin" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>

      <div className="buttonLoSi my-3">
        <button className="signupB">login</button>
        <a className="loginB" href={`/SignUp?redirect=${redirect}`}>
          <button className="loginB">signup</button>
        </a>
      </div>
    </>
  );
};

export default Login;
