import React, {useEffect, useState } from "react";
import axios from "axios";
import './Beauty.css'
import {beautyURL} from "../../api";
import {Link} from 'react-router-dom';

interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

const Beauty: React.FC = () => {
    const [beauty, setBeauty] = useState<Product[]>([]);

    useEffect(() => {
        const fetchbeauty = async () => {
            try {
                const respone = await axios.get(beautyURL);
                setBeauty(respone.data.products.slice(0, 4));
            }catch (error) {
                console.error("Failed to fetch beauty products: ", error)
            }
        };

        fetchbeauty();
    }, []);

    return (
        <div className="beautyContainer">
            <h2>Beauty</h2>
            <div className="beauty">
                {beauty.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} className="beautyCard">
                        <img src={product.thumbnail} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>${product.price}</p>

                        <div className="beautyButton">
                            <button>add to cart</button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
    
}

export default Beauty;