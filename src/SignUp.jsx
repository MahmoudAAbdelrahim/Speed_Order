import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState(""); // رسالة الخطأ

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, email, phone, password } = formData;

    if (!fullName || !email || !phone || !password) {
      setErrorMsg("All data is required.");
      return;
    }

    const existingUser = JSON.parse(localStorage.getItem("userInfo"));

    // التحقق إذا الإيميل متكرر
    if (existingUser && existingUser.email === email) {
      setErrorMsg("The account already exists. Log in here.");
      return;
    }

    const userWithLogin = {
      ...formData,
      isLoggedIn: false,
    };

    localStorage.setItem("userInfo", JSON.stringify(userWithLogin));
    navigate("/login");
  };

  return (
    <>
    <div className="container Login my-5">
      <h1 className="text-center mb-4 TextLogin"> Create Account</h1>

      {errorMsg && (
        <div className="alert alert-danger text-center col-md-6 offset-md-3">
          {errorMsg.includes(" Login") ? (
            <>
              {errorMsg} <Link to="/login">Click here</Link>
            </>
          ) : (
            errorMsg
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="FormLogin row g-3">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            className="inputLogin"
            placeholder=" Full Name"
            type="text"
            name="fullName"
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            className="inputLogin"
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
          className="inputLogin"
            placeholder=" Phone"
            type="tel"
            name="phone"
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            className="inputLogin"
            placeholder=" password"
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btnLogin">
            Create Account
          </button>
        </div>
      </form>
              </div>   
              <div  className="buttonLoSi  my-3">
                <a className="loginB " href="/Login"><button className="loginB" >login</button></a>
                <button className="signupB"> signup </button>
              </div>

        </>
  );
};

export default Signup;
