import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { cart, removeFromCart, updateQty, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // ✅ Calculate total quantity properly
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  // Empty Cart
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-pink-50 to-white">
        <h2 className="text-2xl font-semibold text-gray-800">
          Your cart is empty 🛒
        </h2>
        <p className="mt-2 text-gray-500">
          Add products to see them here
        </p>

        <button
          onClick={() => navigate("/products")}
          className="px-6 py-3 mt-6 text-white transition bg-pink-600 shadow-md rounded-xl hover:bg-pink-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
      <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <h1 className="mb-8 text-2xl font-bold text-gray-800 sm:text-3xl">
          Shopping Cart
          <span className="ml-2 text-sm font-medium text-pink-600">
            ({totalItems} items)
          </span>
        </h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Left Side - Cart Items */}
          <div className="space-y-6 lg:col-span-2">
            {cart.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-4 items-center
                           p-5 bg-white rounded-2xl shadow-sm hover:shadow-lg transition
                           border-l-4 border-pink-500"
              >
                {/* Image */}
                <div className="overflow-hidden bg-gray-100 w-28 h-28 rounded-xl ring-1 ring-gray-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>

                  <p className="font-medium text-gray-500">
                    ₹{item.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center overflow-hidden bg-gray-100 rounded-xl">
                      <button
                        onClick={() =>
                          updateQty(item._id, item.qty - 1)
                        }
                        disabled={item.qty <= 1}
                        className="px-4 py-2 text-lg hover:bg-gray-200 disabled:opacity-50"
                      >
                        −
                      </button>

                      <span className="px-4 font-medium">
                        {item.qty}
                      </span>

                      <button
                        onClick={() =>
                          updateQty(item._id, item.qty + 1)
                        }
                        className="px-4 py-2 text-lg hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-lg font-semibold text-right text-gray-800 sm:self-center">
                  ₹{item.price * item.qty}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Summary */}
          <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl h-fit lg:sticky lg:top-24">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 sm:text-xl">
              Price Details
            </h2>

            <div className="flex justify-between mb-2 text-gray-600">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between mb-2 text-gray-600">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="flex justify-between mb-2 text-gray-600">
              <span>Delivery</span>
              <span className="text-green-600">Free</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between mb-4 text-lg font-bold text-gray-800">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            {!isAuthenticated && (
              <p className="mb-4 text-sm text-red-500">
                Please login to complete your purchase
              </p>
            )}

            <button
              onClick={() =>
                isAuthenticated
                  ? navigate("/checkout")
                  : navigate("/login", {
                      state: { from: "/checkout" },
                    })
              }
              className="w-full py-3 text-base text-white transition shadow-md sm:text-lg bg-gradient-to-r from-pink-600 to-pink-500 rounded-xl hover:opacity-90 active:scale-95"
            >
              {isAuthenticated
                ? "PROCEED TO CHECKOUT"
                : "LOGIN TO CONTINUE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}