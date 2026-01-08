import React from "react";
import useCart from "../../context/cart/useCart";
import { useAuth } from "../../context/useAuth";
import { GoTrash } from "react-icons/go";
import "./cart.css";

const Cart: React.FC = () => {
    const { user } = useAuth();
    const { cartItems, increaseQty, decreaseQty, removeItem, clearCart } = useCart();
    
    if (!user) return <h2>Please login first!</h2>;

    const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1;
    const grandTotal = subtotal + tax;
    
    const handleCheckout = () => {
        console.log("-- CHECKOUT RECEIPT --");
        cartItems.forEach(item => {
            console.log(`${item.title} | Price: $${item.price} | Qty: ${item.quantity} | Total: $${item.total}`);
        });
        
        console.log("Subtotal:", subtotal);
        console.log("Tax:", tax);
        console.log("Grand Total:", grandTotal);
        
        clearCart();
    };
    
    return (
        <div className="cartPage">
            <h1>{user.firstName}'s Cart ({cartItems.length} items)</h1>

            <div className="cartLayout">
                <div className="cartList">

                <div className="cartListHeader">
                    <p className="review">Review your items</p>
                    <p className="clear" onClick={clearCart}>Clear Cart</p>
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
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Tax (10%): ${tax.toFixed(2)}</p>

                <hr />
                
                <h3>Total: ${grandTotal.toFixed(2)}</h3>

                <button className="checkoutBtn" onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    </div>
  );
};

export default Cart;