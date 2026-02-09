import React, { useState, useEffect } from "react";
import axios from "axios";
import { productDetailsURL } from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import "./Details.css";
import { FaStar } from "react-icons/fa";
import useCart from "../../context/cart/useCart";
import { useAuth } from "../../context/auth/useAuth";

interface DetailsData {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  description: string;
  rating: number;
}

const Details: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("Product ID from params:", id);

  const [details, setDetails] = useState<DetailsData | null>(null);

  const { user } = useAuth();
  const { addToCart } = useCart();
  const { cartItems } = useCart();

  console.log("Logged in user:", user);
  console.log("Cart items:", cartItems);

  const isInCart = details ? cartItems.some(item => item.id === details.id) : false;

  console.log("product already in cart:", isInCart);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        console.log("Fetching product details for ID:", id);

        const response = await axios.get(`${productDetailsURL}/${id}`);
        console.log("Product details API response:", response.data);

        setDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch product details", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!details) {
    console.log("Product details not loaded yet");
    return null;
  }

  const handleAddToCart = () => {
    console.log("Add to cart");

    if (!user) {
      console.log("User is not logged in so cannot add to cart, Sorry!");
      alert("Please login first to add products to cart");
      return;
    }

    console.log("Adding product to cart:", details);
    addToCart(details);
  };

  return (
    <div className="detailsContainer">
      <div onClick={() => { console.log("Back button clicked"); navigate(-1); }} className="arrow"> ← Back to Products </div>

      <div className="details">
        <div className="detailsCard">
          <img src={details.thumbnail} alt={details.title} />

          <div className="detailsContent">
            <h3>{details.title}</h3>

            <div className="detailsInfo">
              <div className="rating">
                <FaStar />
                <span className="ratingNumber">{details.rating}</span>
              </div>

              <p className="category">{details.category}</p>
            </div>

            <p className="description">{details.description}</p>

            <div className="detailsButton">
              <p className="price">${details.price}</p>
              <button disabled={isInCart} onClick={handleAddToCart}> {isInCart ? "Added to Cart" : "Add to Cart"} </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;