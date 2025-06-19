import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

function DetailsProduct({onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(""); // الصورة الرئيسية

  useEffect(() => {
    fetch("/Api.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        setProduct(found);

        if (found) {
          setMainImage(found.images?.[0] || found.image); // أول صورة
          const relatedItems = data.filter(
            (item) => item.category === found.category && item.id !== found.id
          );
          setRelated(relatedItems);
        }
      });
  }, [id]);

  const [related, setRelated] = useState([]);

  //Alert masseg for add to cart
  const alertMassge=()=>{
    toast.success('Product Added to Cart ✅', {
      position: "top-center",
      autoClose: 3000,
      theme: "colored"
    });
  }

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
    <div className="container mt-4">
      <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">
        ⬅ Back
      </button>

      <div className="row gap-4">
        <div className="col-md-5 text-center">
          <img
            src={mainImage}
            alt={product.name}
            className="img-fluid rounded"
            style={{ maxHeight: "300px", objectFit: "contain" }}
          />
          <div className="d-flex text-center  mt-3 gap-2 flex-wrap">
            {product.images && product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`preview-${index}`}
                className="rounded border"
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  cursor: "pointer",
                  border: img === mainImage ? "2px solid #007bff" : "1px solid #ccc"
                }}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h5>{product.price} EGP</h5>
          <button className="btn btnCart mt-2" onClick={()=>{
            addToCart(),
            onAddToCart (),
            alertMassge ()}
            }>
              <ToastContainer/>
            <FaShoppingCart size={18} /> Add to Cart
          </button>
        </div>
      </div>

      <h4 className="mt-5">Products you may need</h4>
      <div className="d-flex flex-wrap gap-3 my-3">
        {related.map((item) => (
          <Link
            to={`/product/${item.id}`}
            key={item.id}
            className="text-decoration-none text-dark"
          >
            <div className="card" style={{ width: "12rem" }}>
              <img
                src={item.image}
                alt={item.name}
                className="img-top"
                style={{ height: "150px", objectFit: "cover" }}
              />
              <div className="product-card">
                <p style={{fontSize:'14px'}} className="card-title">{item.description}</p>
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
