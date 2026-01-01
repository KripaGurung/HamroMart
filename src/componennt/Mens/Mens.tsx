import React, {useEffect, useState } from "react";
import axios from "axios";
import "./Men.css";
import {menURL} from "../../api";
import {Link} from "react-router-dom";

interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

const Mens: React.FC = () => {
    const [men, setMen] = useState<Product[]>([]);
    const [cart, setCart] = useState<number[]>([]);

    useEffect(() => {
        const fetchmen = async () => {
            try {
                const response = await axios.get(menURL);
                setMen(response.data.products.slice(0, 4));

            }catch (error) {
                console.error("Falied to fetch Mens wear product: ", error)
            }
        };
        fetchmen();
    }, []);

      const handleAddToCart = (e: React.MouseEvent, productId: number) => {
            e.stopPropagation();
            setCart(prev => [...prev, productId]);
        };

    return (
        <div className="menContainer">
            <h2>Men's Wear</h2>
                <div className="men">
                    {men.map((product) => {
                        const isInCart = cart.includes(product.id);
                        return (
                            <div key={product.id} className="menCardWrapper">
                                <Link to={`/product/${product.id}`} className="womenCard">
                                    <img src={product.thumbnail} alt={product.title} />
                                    <h3>{product.title}</h3>
                                    <p>${product.price}</p>
                                </Link>
        
                                <div className="menButton">
                                    <button onClick={(e) => handleAddToCart(e, product.id)} disabled={isInCart}>{isInCart ? 'Added to Cart' : 'Add to Cart'}</button>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    )
}

export default Mens;