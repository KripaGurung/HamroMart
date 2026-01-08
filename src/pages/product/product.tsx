import React, { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import { productURL, categoryListURL } from "../../api";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import useCart from "../../context/cart/useCart";
import { useAuth } from "../../context/useAuth";
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

    const [product, setProduct] = useState<ProductDataProp[]>([]);
    const [filteredProduct, setFilteredProduct] = useState<ProductDataProp[]>([]);
    const [searchText, setSearchText] = useState("");
    const [category, setCategory] = useState<string[]>([]);
    const [showCategory, setShowCategory] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(productURL);
                setProduct(response.data.products.slice(0, 8));
                setFilteredProduct(response.data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
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
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchCategory();
    }, []);

    if (loading) return <h2>Loading Products...</h2>;
    if (loading) return <h2>Loading Categories...</h2>;
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);

        const filtered = product.filter(product => product.title.toLowerCase().includes(value));
        setFilteredProduct(filtered);
    };

    const handleCategory = (categoryName: string) => {
        const filtered = product.filter(product => product.category === categoryName);
        setFilteredProduct(filtered);
        setShowCategory(false);
    };

    const handleAddToCart = ( e: React.MouseEvent<HTMLButtonElement>, product: ProductDataProp) => { e.preventDefault();
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
                    <input type="text" placeholder="Search..." value={searchText} onChange={handleSearch} />
                </div>
                
                <div className="Filter"> 
                    <button onClick={() => setShowCategory(!showCategory)}> <FiFilter size={20} /> Filter </button>
                    
                    {showCategory && (
                        <div className="categoryBox">
                            {category.map((category, index) => (
                                <p key={index} className="categoryItem" onClick={() => handleCategory(category)} > {category} </p>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="productList">

                <div className="products">
                    {filteredProduct.length > 0 ? (
                        filteredProduct.map(product => {
                            const isInCart = cartItems.some( item => item.id === product.id);
                            return (
                                <div key={product.id} className="productCard">

                                    <Link to={`/product/${product.id}`} className="productImgLink" >
                                        
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
                                        <p className="rate">${product.price}</p>
                                        <button disabled={isInCart} onClick={(e) => handleAddToCart(e, product) } > {isInCart ? "Added to Cart" : "Add to Cart"} </button>
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