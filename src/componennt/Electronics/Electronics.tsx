import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Electronics.css";
import {electonicURL} from '../../api';
import {Link} from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const Electronics: React.FC = () => {
  const [electronics, setElectronics] = useState<Product[]>([]);

  useEffect(() => {
    const fetchelectronics = async () => {
      try {
        const response = await axios.get(electonicURL);
        setElectronics(response.data.products.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch electronics products:", error);
      }
    };

    fetchelectronics();
  }, []);

  return (
    <div className="elctronicsContainer">
      <h2>Electronics</h2>
      <div className="electronics">
        {electronics.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="electronicsCard">
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>

            <div className="electronicButton">
              <button>add to cart</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Electronics;