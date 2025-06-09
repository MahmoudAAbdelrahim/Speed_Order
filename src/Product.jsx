import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Product() {
  const [Api, setApi] = useState([]);
  const [images, setImages] = useState({}); // لحفظ الصور حسب ID المنتج

  // استدعاء المنتجات
  useEffect(() => {
    fetch("/Api.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) => item.id >= 6);
        setApi(filtered);
        // جلب الصور بعد جلب المنتجات
        filtered.forEach((item) => fetchImage(item));
      });
  }, []);

  // دالة تجيب صورة من Unsplash حسب اسم المنتج
  const fetchImage = async (item) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          item.name
        )}&client_id=YOUR_ACCESS_KEY`
      );
      const data = await response.json();
      const imageUrl = data.results[0]?.urls?.small || "https://via.placeholder.com/300x200";
      setImages((prev) => ({ ...prev, [item.id]: imageUrl }));
    } catch (err) {
      console.error("Error fetching image:", err);
    }
  };

  return (
    <div className="container my-5 d-flex flex-wrap justify-content-center gap-4">
      {Api.map((item) => (
        <div key={item.id} className="card" style={{ width: "18rem" }}>
          <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
            <img
              src={images[item.id] || "https://via.placeholder.com/300x200"}
              alt={item.name}
              className="card-img-top"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.price} EGP</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Product;
