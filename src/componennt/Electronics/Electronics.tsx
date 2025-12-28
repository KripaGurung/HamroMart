import React, { useEffect, useState } from "react";
import "./Electronics.css";

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
        const response = await fetch(
          "https://dummyjson.com/products/category/smartphones"
        );
        const data = await response.json();
        setElectronics(data.products.slice(0, 4));
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
          <div key={product.id} className="electronicsCard">
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Electronics;