import React, { useState, useEffect } from 'react';
import './product.css';
import axios from "axios";

interface ProductDataProp {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

interface Category {
    id: number;
    name: string;
}

const Product: React.FC = () => {
    const [ product, setProduct ] = useState<ProductDataProp[]>([]);
    const [ searchText, setSearchText ] = useState('');
    const [filteredProduct, setFilteredProduct ] = useState<ProductDataProp[]>([]);
    const [ category, setcategory ] = useState<Category[]>([]);

    useEffect(() => {
        const fetchproduct = async () => {
            try {
                const response = await axios.get("https://dummyjson.com/products");
                setProduct(response.data.products);
                setFilteredProduct(response.data.products)
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchproduct();

        const fetchcategory = async () => {
            try {
                const response = await axios.get("https://dummyjson.com/products/category-list");
                setcategory(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        fetchcategory();
    }, [])
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        
        const filtered = product.filter((product) =>
            product.title.toLowerCase().includes(value)
        );
        setFilteredProduct(filtered);
    };


    return(
        <div className="productContainer">
            <div className="searchFilter">
                <div className="search">
                    <input type="text" placeholder="Search..." value={searchText} onChange={handleSearch} />
                </div>

                <div className="Filter">
                    
                </div>
            </div>

            <div className="productList">
                <div className="products">
                    {filteredProduct && filteredProduct.length > 0 ? (
                        filteredProduct.map((product) => (
                        <div key={product.id} className="productCard">
                            <img src={product.thumbnail} alt={product.title} />
                            <h3>{product.title}</h3>
                            <p>${product.price}</p>
                        </div>
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