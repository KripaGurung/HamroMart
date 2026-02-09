import React, { useState, useEffect, useMemo } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import { productURL, categoryListURL } from "../../api";
import { Link } from "react-router-dom";
import useCart from "../../context/cart/useCart";
import { useAuth } from "../../context/auth/useAuth";
import { FaStar } from "react-icons/fa";
import "./product.css";
import axios from "axios";

export interface ProductDataProp {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number;
  description: string;
}

const Product: React.FC = () => {
  const { addToCart, cartItems } = useCart();
  const { user } = useAuth();
  console.log("Logged in user:", user);
  console.log("Cart items:", cartItems);

  const [products, setProducts] = useState<ProductDataProp[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [category, setCategory] = useState<string[]>([]);
  const [showCategory, setShowCategory] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("Fetching products...");
      const response = await axios.get(productURL);
      console.log("Products API response:", response.data);
      setProducts(response.data.products);
      setLoading(false);
    };

    fetchProducts();

    const fetchCategory = async () => {
      console.log("Fetching categories...");
      const response = await axios.get(categoryListURL);
      console.log("Category API response:", response.data);

      setCategory(response.data);
    };

    fetchCategory();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    console.log("All products:", products);

    if (searchText.trim()) {
      const value = searchText.toLowerCase();
      filtered = filtered.filter(
        product =>
          product.title.toLowerCase().includes(value) ||
          product.category.toLowerCase().includes(value)
      );

      console.log("searchText:", searchText);
      console.log("Filtered by search:", filtered);
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        product => product.category === selectedCategory
      );

      console.log("Selected category:", selectedCategory);
      console.log("Filtered by category:", filtered);
    }

    return filtered;
  }, [products, searchText, selectedCategory]);

  if (loading) {
    console.log("Products are loading...");
    return <h2>Loading Products...</h2>;
  }

  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: ProductDataProp
  ) => {
    event.preventDefault();

    console.log("Add to cart clicked:", product);

    if (!user) {
      console.log("User not logged in, cannot add to cart");
      alert("Please login first to add products to cart");
      return;
    }

    addToCart(product);
    console.log("Product added to cart:", product.id);
  };

  return (
    <div className="productContainer">
      <div className="searchFilter">
        <div className="search">
          <span className="searchIcon"> <FiSearch /> </span>
          <input type="text" placeholder="Search products or category..." value={searchText} onChange={(e) => { console.log("Search input:", e.target.value); setSearchText(e.target.value); }}/>
        </div>

        <div className="Filter">
          <button onClick={() => { console.log("Filter toggle clicked"); setShowCategory(!showCategory); }}> <FiFilter /> Filter </button>

          {showCategory && (
            <div className="categoryBox">
              <p onClick={() => { console.log("Category selected: All"); setSelectedCategory(null); }}> All </p>

              {category.map((category, index) => (
                <p key={index} onClick={() => { console.log("Category selected:", category); setSelectedCategory(category); setShowCategory(false);}}> {category} </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="productList">
        <div className="products">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => {
              const isInCart = cartItems.some( item => item.id === product.id );
              console.log("Product:", product.id, "Is in cart:", isInCart );

              return (
                <div key={product.id} className="productCard">
                  <Link to={`/product/${product.id}`} className="productLink" onClick={() => console.log("Navigating to product:", product.id)}>
                    <div className="productImg">
                      <img src={product.thumbnail} alt={product.title} />
                      <p>{product.category}</p>
                    </div>

                    <div className="productHeading">
                      <h3>{product.title}</h3>

                      <div className="rating">
                        <FaStar />
                        <span className="ratingNumber"> {product.rating} </span>
                      </div>
                    </div>
                  </Link>

                  <p>{product.description}</p>

                  <div className="productButton">
                    <span>${product.price}</span>
                    <button disabled={isInCart} onClick={e => handleAddToCart(e, product)}> {isInCart ? "Added" : "Add to Cart"} </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;