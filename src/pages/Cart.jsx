import { useState } from "react";
import { useCart } from "../context/CartContext";
import { auth, db } from "../firebase/config";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

// Backend server URL (Express + Nodemailer runs here)
const SERVER_URL = "http://localhost:5000";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Get customer details from Firestore "users" collection
      // This fetches the name, phone, company that user saved in Profile page
      let customerName = "";
      let customerPhone = "";
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        customerName = userData.name || "";
        customerPhone = userData.phone || "";
      }

      // Step 2: Save order to Firestore (for your records)
      const orderData = {
        userId: user.uid,
        userEmail: user.email,
        customerName,
        customerPhone,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price || 0,
          quantity: item.quantity,
          imageUrl: item.imageUrl,
        })),
        total: cartTotal,
        status: "pending",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), orderData);

      // Step 3: Send order email to admin via backend server
      // This calls: POST http://localhost:5000/api/send-order-email
      // The Express server receives this and uses Nodemailer to send Gmail
      await fetch(`${SERVER_URL}/api/send-order-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: user.email,
          customerName,
          customerPhone,
          items: cartItems.map((item) => ({
            name: item.name,
            price: item.price || 0,
            quantity: item.quantity,
          })),
          total: cartTotal,
          orderDate: new Date().toLocaleString(),
        }),
      });

      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="cart-container">
        <div className="order-success">
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your order. We have received your order and will process it soon.</p>
          <button className="btn-primary" onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="btn-primary" onClick={() => navigate("/products")}>
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">₹{item.price || 0}</p>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="cart-item-subtotal">
                  ₹{(item.price || 0) * item.quantity}
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>₹{cartTotal}</span>
            </div>
            <button
              className="btn-primary btn-place-order"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
