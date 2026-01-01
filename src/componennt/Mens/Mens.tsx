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

    return (
        <div className="menContainer">
            <h2>Men's Wear</h2>
            <div className="men">
                {men.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} className="menCard">
                        <img src={product.thumbnail} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>${product.price}</p>

                        <div className="menButton">
                            <button>add to cart</button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Mens;