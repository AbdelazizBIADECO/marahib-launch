import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import AddToCartButton from '../cart/AddToCartButton';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showAddToCart = false,
  className = '' 
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const selectedColor = product.colors?.[selectedColorIndex] || product.colors?.[0];
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  // Get the primary image for display
  const primaryImage = product.primary_image || product.images?.[0] || '';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group ${className}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-50">
        <Link to={`/product/${product.id}`}>
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              New
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              -{discountPercentage}%
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Out of Stock
            </span>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
        >
          <Heart 
            size={16} 
            className={`transition-colors ${
              isLiked 
                ? 'text-red-500 fill-red-500' 
                : 'text-gray-600 hover:text-red-500'
            }`} 
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Product Info */}
        <div>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 mt-1">{product.designer}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={`${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300 fill-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Colors */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Colors:</span>
            <div className="flex gap-1">
              {product.colors.slice(0, 4).map((color, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColorIndex(index);
                  }}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    selectedColorIndex === index
                      ? 'border-gray-800 ring-2 ring-gray-800 ring-offset-1'
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500 ml-1">+{product.colors.length - 4}</span>
              )}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">
                <img src="/ed.png" className='w-[20px] inline-block' alt="" /> {product.price.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-sm text-gray-500 line-through">
                  <img src="/ed.png" className='w-[20px] inline-block' alt="" /> {product.originalPrice!.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600">Price incl. VAT</p>
          </div>
        </div>

        {/* Stock Status */}
        {product.stockQuantity <= 5 && product.inStock && (
          <p className="text-xs text-orange-600 font-medium">
            Only {product.stockQuantity} left in stock!
          </p>
        )}

        {/* Add to Cart Button - Always Visible */}
        {showAddToCart && (
          <div className="pt-2">
            <AddToCartButton
              product={product}
              selectedColor={selectedColor}
              quantity={1}
              variant="primary"
              size="sm"
              className="w-full"
              disabled={!product.inStock}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;