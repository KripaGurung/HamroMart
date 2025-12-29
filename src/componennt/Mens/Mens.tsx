import React, {useEffect, useState } from "react";
import "./Men.css"

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
                const response = await fetch("https://dummyjson.com/products/category/mens-shirts");
                const data = await response.json();
                setMen(data.products.slice(0, 4));

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
                    <div key={product.id} className="menCard">
                        <img src={product.thumbnail} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Mens;