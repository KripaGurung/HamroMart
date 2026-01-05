import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoTrash } from "react-icons/go";
import "./cart.css";
import { cartURL } from "../../api";

interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  thumbnail: string;
}

interface CartData {
  products: CartProduct[];
  total: number;
}

const Cart: React.FC = () => {
    const [cart, setCart] = useState<CartData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(cartURL);
                setCart(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    if (loading) return <h2>Loading Cart...</h2>;
    if (!cart) return <h2>No Cart Found</h2>;

    const subtotal = cart.products.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1;
    const grandTotal = subtotal + tax;

    const handleRemove = (id: number) => {
        const updated = cart.products.filter(item => item.id !== id);
        setCart({ ...cart, products: updated });
    };

    return (
        <div className="cartPage">
            <h1>Shopping Cart ({cart.products.length} items)</h1>

            <div className="cartLayout">
                <div className="cartList">
                    <div className="cartListHeader">
                        <p className="review">Review your items</p>
                        <p className="clear" onClick={() => setCart({ ...cart, products: [] })}>Clear Cart</p>
                    </div>

                    {cart.products.map(item => (
                        <div key={item.id} className="cartItem">
                            <img src={item.thumbnail} alt={item.title} />

                            <div className="itemDetails">
                                <h3>{item.title}</h3>
                                <p>${item.price} per unit</p>
                            </div>

                            <div className="qtyBox">
                                <button>-</button>
                                <span>{item.quantity}</span>
                                <button>+</button>
                            </div>
                            
                            <div className="itemTotal">${item.total}</div>

                            <button className="deleteBtn" onClick={() => handleRemove(item.id)}><GoTrash /></button>
                        </div>
                    ))}
                </div>

                <div className="orderSummary">
                    <h2>Order Summary</h2>

                    <div className="summaryRow">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="summaryRow">
                        <span>Tax (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>

                    <hr />

                    <div className="summaryRow total">
                        <span>Total</span>
                        <span>${grandTotal.toFixed(2)}</span>
                    </div>

                    <button className="checkoutBtn">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;