// في React component مثل RegisterForm.jsx
import { useState } from "react";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    image: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://speedorder.ct.ws/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // مهم جدًا
      },
      body: new URLSearchParams(formData),
    });

    const result = await res.text();
    alert(result);
  };

  return (
<form onSubmit={handleSubmit}>
  <input name="name" onChange={handleChange} placeholder="الاسم" required />
  <input name="email" type="email" onChange={handleChange} placeholder="الإيميل" required />
  <input name="phone" onChange={handleChange} placeholder="الموبايل" required />
  <input name="address" onChange={handleChange} placeholder="العنوان" required />
  <input name="password" type="password" onChange={handleChange} placeholder="الباسورد" required />
  <input name="image" onChange={handleChange} placeholder="رابط الصورة" />
  <button type="submit">تسجيل</button>
</form>

  );
}

export default RegisterForm;
