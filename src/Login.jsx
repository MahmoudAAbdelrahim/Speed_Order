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

 const form = new FormData();
for (const key in formData) {
  form.append(key, formData[key]);
}

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
     <input name="email" value={formData.email} onChange={handleChange} placeholder="الإيميل" />
<input name="phone" value={formData.phone} onChange={handleChange} placeholder="الموبايل" />
<input name="address" value={formData.address} onChange={handleChange} placeholder="العنوان" />
<input name="password" value={formData.password} onChange={handleChange} placeholder="الباسورد" />
<input name="image" value={formData.image} onChange={handleChange} placeholder="رابط الصورة" />

      <button type="submit">تسجيل</button>
    </form>
  );
}

export default RegisterForm;
