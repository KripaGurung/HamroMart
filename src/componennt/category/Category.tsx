import React, { useEffect, useState } from "react";
import axios from "axios";
import './category.css';
import {categoryListURL} from '../../api';

const Category: React.FC = () => {
  
  const [category, setCategory] = useState<string[]>([]);

  useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(categoryListURL);
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
