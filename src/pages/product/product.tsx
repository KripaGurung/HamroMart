import React, { useState, useEffect } from 'react';
import { FiFilter } from "react-icons/fi";
import './product.css';
import axios from "axios";
import {productURL, categoryListURL} from "../../api";
import {Link} from 'react-router-dom';
import { FaStar } from "react-icons/fa";


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
    const [ product, setProduct ] = useState<ProductDataProp[]>([]);
    const [ searchText, setSearchText ] = useState('');
    const [ filteredProduct, setFilteredProduct ] = useState<ProductDataProp[]>([]);
    const [ category, setcategory ] = useState<string[]>([]);
    const [ showCategory, setShowCategory ] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchproduct = async () => {
            try {
                const response = await axios.get(productURL);
                setProduct(response.data.products.slice(0, 4));
                setFilteredProduct(response.data.products)
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchproduct();

        const fetchcategory = async () => {
            try {
                const response = await axios.get(categoryListURL);
                setcategory(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchcategory();
    }, []);

    if (loading) return <h2>Loading Products...</h2>;
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        
        const filtered = product.filter((product) =>
            product.title.toLowerCase().includes(value)
        );
        setFilteredProduct(filtered);
    };

    const handleCategory = (categoryName: string) => {
        const filtered = product.filter((item) => item.category === categoryName);
        setFilteredProduct(filtered);
        setShowCategory(false);
    }

    return(
        <div className="productContainer">
            <div className="searchFilter">
                <div className="search">
                    <input type="text" placeholder="Search..." value={searchText} onChange={handleSearch} />
                </div>

                <div className="Filter">
                    <button onClick = {() => setShowCategory(!showCategory)}> <FiFilter size={20} /> Filter </button>

                    {showCategory && (
                        <div className="categoryBox">
                            {category.map((cat, index) => (<p key ={index} className="categoryItem" onClick = {() => handleCategory(cat)}> {cat} </p>))}
                        </div>
                    )}
                </div>
            </div>

            <div className="productList">
                <div className="products">
                    {filteredProduct && filteredProduct.length > 0 ? (
                        filteredProduct.map((product) => (
                        <Link to={`/product/${product.id}`} key={product.id} className="productCard">
                            <div className="productImg">
                                <img src={product.thumbnail} alt={product.title} />
                                <p>{product.category}</p>
                            </div>
                            <div className="productHeading">
                                <h3>{product.title}</h3>
                                
                                <div className="rating">
                                    <FaStar />
                                    <span className="ratingNumber">{product.rating}</span>
                                </div>
                            </div>
                            
                            <p>{product.description}</p>
                            
                            <div className="productButton">
                                <p className="rate">${product.price}</p>
                                <button>add to cart</button>
                            </div>
                        </Link>
                        ))
                    ) : (
                    
                    <p>No products found.</p>

                    )}
                </div>
            </div>
        </div>
    )
}

export default Product;