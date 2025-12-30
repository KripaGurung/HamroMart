import React, {useEffect, useState } from "react";
import axios from "axios";
import './Women.css';
import {womenURL} from "../../api";

interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

const Women: React.FC = () => {
    const [women, setWomen] = useState<Product[]>([]);

    useEffect(() => {
        const fetchwomen = async () => {
            try {
                const respone = await axios.get(womenURL);
                setWomen(respone.data.products.slice(0, 4));
            }catch (error) {
                console.error('Falied to fetch Women wear product: ', error)
            }
        };

        fetchwomen();
    }, []);

    return (
        <div className="womenContainer">
            <h2>Women Wear</h2>
            <div className="beauty">
                {women.map((product) => (
                    <div key={product.id} className="womenCard">
                        <img src={product.thumbnail} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>${product.price}</p>

                        <div className="womenButton">
                            <button>add to cart</button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Women;