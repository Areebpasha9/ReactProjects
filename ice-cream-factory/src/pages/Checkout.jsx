import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const total = cartItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
    );

    const handlePayment = () => {
        const options = {
            key: "rzp_test_xxxxxxx",
            amount: total * 100,
            currency: "INR",
            name: "Ice Cream Factory",
            description: "Demo Payment",
            handler: function () {
                alert("Payment Successful ");
                clearCart();

                navigate("/")
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <button
            onClick={handlePayment}
            className="w-full bg-pink-500 text-white py-3 rounded-lg my-30 "     
        >
            Pay ₹{total}
        </button>
    );
};

export default Checkout;
