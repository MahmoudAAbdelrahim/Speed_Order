import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    if (user) {
      const userData = JSON.parse(user);
      if (userData.isLoggedIn) {
        navigate("/profile");
      }
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("userInfo"));

    if (!userData) {
      setErrorMsg("You don't have an account yet. Please sign up first.");
      return;
    }

    if (email === userData.email && password === userData.password) {
      // تسجيل الدخول ناجح
      localStorage.setItem("userInfo", JSON.stringify({ ...userData, isLoggedIn: true }));
      navigate("/profile");
    } else {
      setErrorMsg("The email or password is incorrect. Please try again.");
    }
  };

  return (
    <>
    <div className="container Login my-5">
      <h1 className="TextLogin mb-4  text-center "> Login..</h1>
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

        {/* مكان رسالة الخطأ */}
        {errorMsg && (
          <div className="col-md-6 offset-md-3 text-danger fw-bold">
            {errorMsg}
          </div>
        )}

        <div className="gap-2 mb-2" style={{ display: "flex", justifyContent: "center"   }}>
          <button className="btnLogin" type="submit">
              Login
          </button>
        </div>
      </form>
   
    </div>
           <div  className="buttonLoSi  my-3">                
            <button className="signupB"> login </button>
                <a className="loginB " href="/SignUp"><button className="loginB" >signup</button></a>
          </div>
          </>
  );
};

export default Login;
