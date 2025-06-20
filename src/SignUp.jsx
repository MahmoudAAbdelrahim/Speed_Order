import { useNavigate, useLocation, Link } from "react-router-dom";
import React, { useState} from "react";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
console.log("✅ VITE_API_URL =", import.meta.env.VITE_API_URL);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, phone, password } = formData;

    if (!fullName || !email || !phone || !password) {
      setErrorMsg("All fields are required.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          phone,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // تخزين بيانات المستخدم مؤقتًا
        localStorage.setItem("userInfo", JSON.stringify({ ...data.user, isLoggedIn: true }));

        // تحديد المكان اللي جاي منه
        const redirectFrom = location.state?.from || "/";
        navigate(redirectFrom);
      } else {
        if (data.error && data.error.includes("already exists")) {
          setErrorMsg("الحساب موجود فعلاً. قم بتسجيل الدخول.");
        } else {
          setErrorMsg(data.error || "حدث خطأ أثناء إنشاء الحساب.");
        }
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setErrorMsg("خطأ في السيرفر.");
    }
  };

  return (
    <>
      <div className="container Login my-5">
        <h1 className="text-center mb-4 TextLogin">Create Account</h1>

        {errorMsg && (
          <div className="alert alert-danger text-center col-md-6 offset-md-3">
            {errorMsg.includes("تسجيل الدخول") ? (
              <>
                {errorMsg} <Link to="/login">اضغط هنا</Link>
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
              placeholder="Full Name"
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
              placeholder="Phone"
              type="tel"
              name="phone"
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              className="inputLogin"
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center mt-3">
            <button type="submit" className="btnLogin">
              Create Account
            </button>
          </div>
        </form>
      </div>

        <div className="buttonLoSi my-3">
        <button className="signupB">Signup</button>
        <a className="loginB" href="/Login">
          <button className="loginB">Login</button>
        </a>
      </div>
    </>
  );
};

export default Signup;
