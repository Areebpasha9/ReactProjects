import React, { useState } from 'react';
import { Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const sizes = product.sizes || [
    { size: 'Small', price: product.price * 0.68 },
    { size: 'Medium', price: product.price },
    { size: 'Large', price: product.price * 1.85 }
  ];

  const [selectedSize, setSelectedSize] = useState(sizes[1]);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };
  const gstPrice = selectedSize.price * 5 / 100;
  console.log(gstPrice);
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      selectedSize,
      quantity,
      totalPrice: selectedSize.price * quantity
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">

      {/* Image */}
      <div className='relative'>
        <img

          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
        {product.isNew && (
          <span className='absolute top-2 left-2 bg-red-500 text-white  font-bold px-2 py-0.5 rounded-full shadow'>NEW</span>
        )}
        <div className='absolute top-2 right-2 backdrop-blur bg-white/90 px-2 py-1 rounded-full flex items-center gap-1 shadow'>
          <Star className='h-4 w-4 text-yellow-400 fill-yellow-400' />
          <span className="text-sm font-bold text-gray-800">{product.rating || 4.5}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <h3 className="font-bold">{product.name}</h3>
          <span className="font-bold">₹{selectedSize.price.toFixed(0)}</span>
        </div>
        {/* Size buttons */}
        <div className="flex gap-2 mb-3">
          {sizes.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelectedSize(s)}
              className={`px-3 py-1 rounded text-sm ${selectedSize.size === s.size
                ? 'bg-pink-400 text-white hover:bg-pink-600'
                : 'bg-gray-200 hover:bg-gray-400'
                }`}
            >
              {s.size}
            </button>
          ))}
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-2 mb-3">
          <button onClick={() => handleQuantityChange(-1)}>
            <Minus className='text-2xl font-bold' />
          </button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange(1)}>
            <Plus className='text-2xl font-bold' />
          </button>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-pink-400 text-white py-2 rounded flex justify-center items-center gap-2 hover:bg-pink-600"
        >
          <ShoppingCart size={24} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
