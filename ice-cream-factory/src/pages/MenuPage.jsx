import React from 'react';
import ProductCard from '../components/ProductCard';
import { iceCreamFlavors } from '../data/products';

const MenuPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-display text-center mb-4">Our Ice Cream Menu</h1>
            <p className="text-xl text-gray-600 text-center mb-8">
                Discover our delicious selection of handcrafted flavors
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {iceCreamFlavors.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Price Summary */}
            <div className="mt-12 p-6 bg-ice-cream-pink/5 rounded-xl">
                <h2 className="text-2xl font-display text-center mb-4">Price Range</h2>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-xl font-bold">₹55 - ₹100</div>
                        <div className="text-gray-600">Single Scoop</div>
                    </div>
                    <div>
                        <div className="text-xl font-bold">₹155 - ₹250</div>
                        <div className="text-gray-600">Double Scoop</div>
                    </div>
                    <div>
                        <div className="text-xl font-bold">₹175 - ₹350</div>
                        <div className="text-gray-600">Pint</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuPage;