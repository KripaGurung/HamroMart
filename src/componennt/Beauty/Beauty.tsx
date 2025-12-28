import React, {useEffect, useState } from "react";
import './Beauty.css'

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
                const respone = await fetch("https://dummyjson.com/products/category/beauty");
                const data = await respone.json();
                setBeauty(data.products.slice(0, 4));
            }catch (error) {
                console.error("Failde to fetch beauty products: ", error)
            }
        };

        fetchbeauty();
    }, []);

    return (
        <div className="beautyContainer">
            <h2>Beauty</h2>
            <div className="beauty">
                {beauty.map((product) => (
                    <div key={product.id} className="beautyCard">
                        <img src={product.thumbnail} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
    
}

export default Beauty;