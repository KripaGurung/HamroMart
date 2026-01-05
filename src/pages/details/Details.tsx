import React, { useState, useEffect } from "react";
import axios from "axios";
import { productDetailsURL } from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import "./Details.css";
import { FaStar } from "react-icons/fa";

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
  const [details, setDetails] = useState<DetailsData | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`${productDetailsURL}/${id}`);
        setDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch product details", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!details) return null;

  return (
    <div className="detailsContainer">
      <div onClick={() => navigate(-1)} className="arrow"> ← Back to Products</div>
      
      <div className="details">
        <div className="detailsCard">
          <img src={details.thumbnail} alt={details.title} />

          <div className="detailsContent">
            <h3>{details.title}</h3>

            <div className="rating">
              <FaStar />
              <span className="ratingNumber">{details.rating}</span>
              
              <p className="category">{details.category}</p>
            </div>

            <p className="description">{details.description}</p>

            <div className="detailsButton">
              <p className="price">${details.price}</p>
              <button>add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;