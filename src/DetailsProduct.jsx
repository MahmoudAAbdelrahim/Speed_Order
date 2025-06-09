import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function DetailsProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    fetch("/Api.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        setProduct(found);

        if (found) {
          const relatedItems = data.filter(
            (item) => item.category === found.category && item.id !== found.id
          );
          setRelated(relatedItems);
        }
      });
  }, [id]);

 const addToCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find((item) => item.id === product.id);

  if (!existing) {
    cart.push({ ...product, quantity: 1 });
  } else {
    existing.quantity += 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

  if (!product) return <div className="p-5 text-center">Loading...</div>;

  return (
    <div className="container mt-5">
      <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">
        ⬅ رجوع
      </button>

      <div className="card shadow text-center">
        <h2 className="card-title mt-3">{product.name}</h2>
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h4 className="text-success">{product.price} EGP</h4>
          <p className="card-text">{product.description}</p>
          <button className="btn btn-primary" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      <h3 className="mt-5">Products you may need</h3>
      <div className="d-flex flex-wrap justify-content-start gap-3 my-3">
        {related.map((item) => (
          <Link
            to={`/product/${item.id}`}
            key={item.id}
            className="text-decoration-none text-dark"
          >
            <div className="card" style={{ width: "14rem" }}>
              <img
                src={item.image}
                alt={item.name}
                className="card-img-top"
                style={{ height: "150px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h6 className="card-title">{item.name}</h6>
                <p className="card-text">{item.price} EGP</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DetailsProduct;
