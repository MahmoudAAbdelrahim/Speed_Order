import React, { useState } from "react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    image: "", // ممكن تبقى Base64 لو عايز تبعت صورة
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

const res = await fetch("/api/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
});

      const result = await res.json();
      console.log(result);

      if (result.success) {
        alert("✅ تم التسجيل بنجاح");
      } else {
        alert("❌ حصل خطأ: " + result.error);
      }
    } catch (error) {
      alert("⚠️ فشل الاتصال بالسيرفر: " + error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="الاسم" onChange={handleChange} />
      <input name="email" type="email" placeholder="الإيميل" onChange={handleChange} />
      <input name="phone" placeholder="رقم الهاتف" onChange={handleChange} />
      <input name="address" placeholder="العنوان" onChange={handleChange} />
      <input name="password" type="password" placeholder="كلمة المرور" onChange={handleChange} />
      
      {/* صورة لو هتبعتها كنص Base64 */}
      {/* <input type="file" onChange={handleImageUpload} /> */}

      <button type="submit">تسجيل</button>
    </form>
  );
};

export default RegisterForm;
