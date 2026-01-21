import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cartItems, removeFromCart } = useCart();

    const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    const CGST_RATE = 0.09;
    const SGST_RATE = 0.09;

    const cgst = Number((total * CGST_RATE).toFixed(2));
    const sgst = Number((total * SGST_RATE).toFixed(2));

    const gst = cgst + sgst;
    const grandTotal = Number((total + gst).toFixed(0));

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h2 className="text-3xl font-bold">Your cart is empty 🍦</h2>
            </div>
        ); }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-display mb-6">Your Cart</h1>

            <div className="space-y-4">
                {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center bg-white p-4 rounded-xl shadow">
                        <img src={item.image} className="w-20 h-20 rounded object-cover" />

                        <div className="ml-4 flex-1">
                            <h3 className="font-bold text-xl">{item.name}</h3>
                            <p className=" font-bold text-gray-600">
                                {item.selectedSize.size} × {item.quantity}
                            </p>
                        </div>

                        <div className="font-bold mr-4">₹{item.totalPrice.toFixed(0)}</div>

                        <button onClick={() => removeFromCart(index)}>
                            <Trash className="text-red-500" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-right text-2xl font-bold">
                Total: ₹{grandTotal}
            </div>
            <div className="mt-8 bg-white p-6 rounded-xl shadow">
                <div className="space-y-3 text-gray-700">

                    <div className="flex justify-between">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>CGST (9%)</span>
                        <span>₹{cgst.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>SGST (9%)</span>
                        <span>₹{sgst.toFixed(2)}</span>
                    </div>

                    <hr />

                    <div className="flex justify-between text-lg font-bold">
                        <span>Total Payable</span>
                        <span>₹{grandTotal.toFixed(2)}</span>
                    </div>

                </div>

                <Link
                    to="/checkout"
                    className="mt-6 block w-full bg-pink-500 text-white py-3 rounded-lg font-bold text-center hover:bg-pink-600"
                >
                    Go to Checkout
                </Link>

            </div>

        </div>

    );
};

export default CartPage;
