import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check, Heart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Product, Color } from '../../types';

interface AddToCartButtonProps {
  product: Product;
  selectedColor?: Color;
  quantity?: number;
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showWishlist?: boolean;
  onAddToCart?: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  selectedColor,
  quantity = 1,
  variant = 'primary',
  size = 'md',
  className = '',
  showWishlist = false,
  onAddToCart
}) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);

    try {
      addToCart({
        type: 'product',
        productId: product.id,
        name: product.name,
        designer: product.designer,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        quantity,
        selectedColor: selectedColor || product.colors[0]
      });

      setIsAdded(true);
      onAddToCart?.();

      // Reset the added state after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  const variantClasses = {
    primary: 'bg-black text-white hover:bg-gray-900',
    secondary: 'bg-white text-black border border-black hover:bg-gray-50',
    icon: 'p-3 bg-white border border-gray-300 hover:bg-gray-50 rounded-full'
  };

  if (variant === 'icon') {
    return (
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          disabled={isAdding || !product.inStock}
          className={`${variantClasses.icon} transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
          {isAdding ? (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          ) : isAdded ? (
            <Check className="w-5 h-5 text-green-600" />
          ) : (
            <ShoppingCart className="w-5 h-5" />
          )}
        </motion.button>
        
        {showWishlist && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-white border border-gray-300 hover:bg-gray-50 rounded-full transition-all duration-300"
          >
            <Heart className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleAddToCart}
      disabled={isAdding 
        // || !product.inStock
      }
      className={`
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        font-medium transition-all duration-300 uppercase tracking-wide 
        flex items-center justify-center
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {isAdding ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : isAdded ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Added to Cart
        </>
      ) 
      // : !product.inStock ? (
      //   'Out of Stock'
      // ) 
      : (
        <>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </>
      )}
    </motion.button>
  );
};

export default AddToCartButton;