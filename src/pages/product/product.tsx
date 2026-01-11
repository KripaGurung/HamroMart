import React, { useState, useEffect, useMemo } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import { productURL, categoryListURL } from "../../api";
import { Link } from "react-router-dom";
import useCart from "../../context/cart/useCart";
import { useAuth } from "../../context/useAuth";
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

    const [products, setProducts] = useState<ProductDataProp[]>([]);
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [category, setCategory] = useState<string[]>([]);
    const [showCategory, setShowCategory] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(productURL);
            setProducts(response.data.products);
            setLoading(false);
        };

        fetchProducts();

        const fetchCategory = async () => {
            const response = await axios.get(categoryListURL);
            setCategory(response.data);
        };

        fetchCategory();
    }, []);
    
    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        if (searchText.trim()) {
            const value = searchText.toLowerCase();
            filtered = filtered.filter( product => product.title.toLowerCase().includes(value) || product.category.toLowerCase().includes(value));

            console.log("searchText:", searchText);
            console.log("filtered search:", filtered);
        }

        if (selectedCategory) {
            filtered = filtered.filter(
                product => product.category === selectedCategory
            );

            console.log( "selectedCategory:",selectedCategory);
            console.log("filtered category:", filtered);
        }
        
        return filtered;
    
    }, [products, searchText, selectedCategory]);
    
    if (loading) return <h2>Loading Products...</h2>;
    
    const handleAddToCart = ( e: React.MouseEvent<HTMLButtonElement>, product: ProductDataProp ) => {
        e.preventDefault();
        
        if (!user) {
            alert("Please login first to add products to cart");
            return;
        }
        addToCart(product);
    };
    
    return (
    
    <div className="productContainer">
        <div className="searchFilter">
            <div className="search">
                <span className="searchIcon"> <FiSearch /> </span>
                <input type="text" placeholder="Search products or category..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            </div>
            
            <div className="Filter">
                <button onClick={() => setShowCategory(!showCategory)}> <FiFilter /> Filter </button>
                
                {showCategory && (
                    <div className="categoryBox">
                        <p onClick={() => setSelectedCategory(null)}>All</p>
                        {category.map((category, i) => (
                            <p key={i} onClick={() => { setSelectedCategory(category); setShowCategory(false); }} > {category} </p>
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
                        
                        return (
                            <div key={product.id} className="productCard">

                                <Link to={`/product/${product.id}`} className="productLink">
                                
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
                                    <button disabled={isInCart} onClick={e => handleAddToCart(e, product) } > {isInCart ? "Added" : "Add to Cart"} </button>
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