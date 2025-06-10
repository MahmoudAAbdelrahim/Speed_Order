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

    // هنا بنستخدم FormData عشان PHP يقدر يقرأ القيم من $_POST
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const res = await fetch("https://speedorder.ct.ws/register.php", {
        method: "POST",
        body: form,
      });

      const result = await res.text();
      alert(result);
    } catch (error) {
      alert("Error: " + error.message);
    }
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
