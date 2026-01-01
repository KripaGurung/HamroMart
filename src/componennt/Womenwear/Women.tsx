import React, { useEffect, useState } from "react";
import axios from "axios";
import './Women.css';
import { womenURL } from "../../api";
import { Link } from 'react-router-dom';

interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

const Women: React.FC = () => {
    const [women, setWomen] = useState<Product[]>([]);
    const [cart, setCart] = useState<number[]>([]);

    useEffect(() => {
        const fetchWomen = async () => {
            try {
                const response = await axios.get(womenURL);
                setWomen(response.data.products.slice(0, 4));
            } catch (error) {
                console.error('Failed to fetch Women wear product: ', error);
            }
        };
        fetchWomen();
    }, []);

    const handleAddToCart = (e: React.MouseEvent, productId: number) => {
        e.stopPropagation();
        setCart(prev => [...prev, productId]);
    };

    return (
        <div className="womenContainer">
            <h2>Women Wear</h2>
            <div className="women">
                {women.map((product) => {
                    const isInCart = cart.includes(product.id);
                    return (
                        <div key={product.id} className="womenCardWrapper">
                            <Link to={`/product/${product.id}`} className="womenCard">
                                <img src={product.thumbnail} alt={product.title} />
                                <h3>{product.title}</h3>
                                <p>${product.price}</p>
                            </Link>

                            <div className="womenButton">
                                <button onClick={(e) => handleAddToCart(e, product.id)} disabled={isInCart}>{isInCart ? 'Added to Cart' : 'Add to Cart'}</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Women;