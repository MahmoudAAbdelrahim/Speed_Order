import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/Api.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) => item.id >= 6);
        setProducts(filtered);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="product-container my-5 d-flex flex-wrap justify-content-center gap-4">
      {products.map((item) => (
        <div key={item.id} className="card" style={{ width: "18rem" }}>
          <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
            <img
              src={item.image}
              alt={item.name}
              className="card-img-top"
              style={{ height: "250px", objectFit: "cover" }}
            />
            <div className="product-card text-center">
              <p className="card-title">{item.name}</p>
              <p className="card-text">{item.price} EGP</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Product;
