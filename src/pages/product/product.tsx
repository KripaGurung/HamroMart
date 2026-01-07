import React, { useState, useEffect } from 'react';
import { FiFilter } from "react-icons/fi";
import { productURL, categoryListURL } from "../../api";
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import './product.css';
import axios from "axios";

interface ProductDataProp {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    category: string;
    rating: number;
    description: string;
}

const Product: React.FC = () => {
    const [product, setProduct] = useState<ProductDataProp[]>([]);
    const [filteredProduct, setFilteredProduct] = useState<ProductDataProp[]>([]);
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState<string[]>([]);
    const [showCategory, setShowCategory] = useState(false);
    const [loading, setLoading] = useState(true);
    const [addedProducts, setAddedProducts] = useState<number[]>([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(productURL);
                setProduct(response.data.products.slice(0, 8)); 
                setFilteredProduct(response.data.products);
            } catch (error) {
                console.error("Error on fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        
        const fetchCategory = async () => {
            try {
                const response = await axios.get(categoryListURL);
                setCategory(response.data);
            } catch (error) {
                console.error("Error on fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchCategory();
    }, []);
    
    if (loading) return <h2>Loading Products...</h2>;
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        
        const filtered = product.filter(product =>
      product.title.toLowerCase().includes(value)
    );
    setFilteredProduct(filtered);
  };
  const handleCategory = (categoryName: string) => {
    const filtered = product.filter(product => product.category === categoryName);
    setFilteredProduct(filtered);
    setShowCategory(false);
  };
  const handleAddToCart = (id: number) => {
    if (!addedProducts.includes(id)) {
      setAddedProducts([...addedProducts, id]);
    }
  };

  return (
    <div className="productContainer">
      <div className="searchFilter">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearch}
          />
        </div>

        <div className="Filter">
          <button onClick={() => setShowCategory(!showCategory)}>
            <FiFilter size={20} /> Filter
          </button>

          {showCategory && (
            <div className="categoryBox">
              {category.map((cat, index) => (
                <p
                  key={index}
                  className="categoryItem"
                  onClick={() => handleCategory(cat)}
                >
                  {cat}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="productList">
        <div className="products">
          {filteredProduct.length > 0 ? (
            filteredProduct.map(p => (
              <div key={p.id} className="productCard">
                <Link to={`/product/${p.id}`} className="productImgLink">
                  <div className="productImg">
                    <img src={p.thumbnail} alt={p.title} />
                    <p>{p.category}</p>
                  </div>
                  <div className="productHeading">
                    <h3>{p.title}</h3>
                    <div className="rating">
                      <FaStar />
                      <span className="ratingNumber">{p.rating}</span>
                    </div>
                  </div>
                </Link>

                <p>{p.description}</p>

                <div className="productButton">
                  <p className="rate">${p.price}</p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(p.id);
                    }}
                    disabled={addedProducts.includes(p.id)}
                  >
                    {addedProducts.includes(p.id) ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;