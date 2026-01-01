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
  const [cart, setCart] = useState<number[]>([]);

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

  const handleAddToCart = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    setCart(prev => [...prev, productId]);
  };

  return (
    <div className="elctronicsContainer">
      <h2>Electronics</h2>
      <div className="electronics">
        {electronics.map((product) => {
          const isInCart = cart.includes(product.id);
          return (
            <div key={product.id} className="electronicsCardWrapper">
              <Link to={`/product/${product.id}`} className="electronicsCard">
                <img src={product.thumbnail} alt={product.title} />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
              </Link>
              <div className="electronicButton">
                <button onClick={(e) => handleAddToCart(e, product.id)} disabled={isInCart}>{isInCart ? 'Added to Cart' : 'Add to Cart'}</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Electronics;