import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { GoTrash } from "react-icons/go";
import { getCartURL } from "../../api";
import useCart from "../../context/cart/useCart";
import "./cart.css";
import axios from "axios";

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
    const { user } = useAuth();
    const [cart, setCart] = useState<CartData>({ products: [], total: 0 });
    const [loading, setLoading] = useState(true);
    const { cartItems, increaseQty, decreaseQty, removeItem, clearCart } = useCart();


    useEffect(() => {
        if (!user) return;
        
        const fetchCart = async () => {
            try {
                const response = await axios.get(getCartURL(user.id));
                console.log("Product that are added to Cart: ", response.data);
                setCart(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, [user]);

    if (loading) return <h2>Loading Cart...</h2>;
    if (!cart) return <h2>No Cart Found</h2>;
    
    const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1;
    const grandTotal = subtotal + tax;
    
    const handleCheckout = () => {
        console.log("-- CHECKOUT RECEIPT --");
        cartItems.forEach(item => {
        console.log(`${item.title} | Price: $${item.price} | Qty: ${item.quantity} | Total: $${item.total}`);
    });
    
    console.log("----------------------------");
    console.log("Subtotal:", subtotal);
    console.log("Tax (10%):", tax);
    console.log("Grand Total:", grandTotal);
    console.log("----------------------------");

    clearCart();
    };

    
    return (
        <div className="cartPage">
            <h1>{user?.firstName}'s Cart ({cart?.products?.length} items)</h1>

            <div className="cartLayout">
                <div className="cartList">

                    <div className="cartListHeader">
                        <p className="review">Review your items</p>
                        <p className="clear"onClick={() => setCart({ ...cart, products: [] })}>Clear Cart</p>
                    </div>

                    {cartItems.map(item => (
                        <div key={item.id} className="cartItem">
                            <img src={item.thumbnail} />
                            <h3>{item.title}</h3>
                            <button onClick={() => decreaseQty(item.id)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => increaseQty(item.id)}>+</button>
                            <p>${item.total}</p>
                            <button onClick={() => removeItem(item.id)}> <GoTrash /> </button>
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

                    <button className="checkoutBtn" onClick={handleCheckout}> Proceed to Checkout </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;