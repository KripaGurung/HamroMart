import React, {useEffect, useState } from "react";
import './Women.css';

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
                const respone = await fetch("https://dummyjson.com/products/category/womens-dresses");
                const data = await respone.json();
                setWomen(data.products.slice(0, 4));
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
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Women;