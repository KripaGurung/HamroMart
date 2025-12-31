import React, { useEffect, useState } from "react";
import axios from "axios";
import './cart.css';
import {cartURL} from "../../api";

interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  thumbnail: string;
}

interface CartData {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(cartURL);
                setCart(response.data);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching cart", error);
                setLoading(false);
            }
        };

        fetchCart();
    }, []);
    
    if (loading) {
        return 
        <h2>Loading Cart...</h2>;
    }

    if (!cart) {
        return 
        <h2>No Cart Found</h2>;
    }

    const handleRemove = (id: number) => {
        if (!cart) return;

        const updatedProducts = cart.products.filter(item => item.id !== id);
        setCart({
            ...cart,
            products: updatedProducts,
            totalProducts: updatedProducts.length,
            totalQuantity: updatedProducts.reduce((sum, item) => sum + item.quantity, 0),
            total: updatedProducts.reduce((sum, item) => sum + item.total, 0),
            discountedTotal: updatedProducts.reduce((sum, item) => sum + item.total, 0),
        });

        alert("Product deleted successfully!");
    };
    

  return (
        <div className="cartContainer">
            <h1>Your Cart</h1>

            <div className="cartProducts">
                {cart.products.map((item) => (
                    <div key={item.id} className="cartCard">
                        <img src={item.thumbnail} alt={item.title} />

                        <div className="cartInfo">
                            <h3>{item.title}</h3>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Total: ${item.total}</p>
                        </div>

                        <div className="cartRemove">
                            <button onClick={() => handleRemove(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cartSummary">
                <h2>Cart Summary</h2>
                <p>Total Products: {cart.totalProducts}</p>
                <p>Total Quantity: {cart.totalQuantity}</p>
                <p>Total Price: ${cart.total}</p>
                <p>Discounted Total: ${cart.discountedTotal}</p>

                <div className="summaryButton">
                    <button>Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;