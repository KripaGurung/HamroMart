import React, { useEffect, useState } from "react";
import axios from "axios";
import './category.css';

const Category: React.FC = () => {
  
  const [category, setCategory] = useState<string[]>([]);

  useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get("https://dummyjson.com/products/category-list");
                setCategory(response.data);
            } catch (error) {
                console.error("Failed to fetch category list:", error);
            }
        };

        fetchCategory();
    }, []);

  return (
    <div className="categoryContainer">
      <h2>Categories</h2>

      <div className="category">
            {category.map((cat) => (
            <div key={cat} className="categoryCard">
                <h3>{cat}</h3>
            </div>
            ))}
        </div>
    </div>
  );
};

export default Category;
