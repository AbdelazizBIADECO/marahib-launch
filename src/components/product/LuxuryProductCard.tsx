import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../../types';
import AddToCartButton from '../cart/AddToCartButton';

interface LuxuryProductCardProps {
  product: Product;
  index?: number;
  showGradient?: boolean;
  showWishlist?: boolean;
  showRating?: boolean;
  showAddToCart?: boolean;
  variant?: 'minimal' | 'detailed';
  className?: string;
  useCustomImage?: boolean;
}

const LuxuryProductCard: React.FC<LuxuryProductCardProps> = ({ 
  product, 
  index = 0, 
  showGradient = false,
  showWishlist = false,
  showRating = false,
  showAddToCart = false,
  variant = 'minimal',
  className = '',
  useCustomImage = false
}) => {
  // Utiliser l'image Louis Vuitton pour tous les produits si useCustomImage est true
  const productImage = useCustomImage 
    ? '/louis-vuitton-blossom-stool-metal-by-tokujin-yoshioka--R96193_PM2_Front view copy copy.png'
    : product.primary_image;
console.log("productImage: ", useCustomImage, productImage, product);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative overflow-hidden bg-white ${className}`}
      style={{ minHeight: variant === 'minimal' ? '500px' : '500px' }}
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        {/* Image avec fond blanc pur */}
        <div className="relative aspect-square overflow-hidden bg-white flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-200/90 to-white/80 pointer-events-none z-0" />
          <img 
            src={productImage}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105 relative z-10"
            style={{ padding: '10%' }}
          />
          
          {/* Bouton wishlist optionnel */}
          {showWishlist && (
            <button className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100">
              <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
            </button>
          )}
        </div>

        {/* Informations produit - typographie raffinée */}
        <div className="bg-white flex flex-col justify-center px-6 py-4">
          {/* Designer */}
          <p className="text-[#6e6e6e] text-sm font-light tracking-wide uppercase" style={{ letterSpacing: '0.05em' }}>
            {product.brand}
          </p>
          
          {/* Nom du produit */}
          <h3 className="text-[#1d1d1d] font-light leading-tight tracking-wide text-lg mt-1 mb-2" style={{ letterSpacing: '0.025em' }}>
            {product.name}
          </h3>
          
          {/* Prix */}
          <div className="flex items-baseline">
            <span className="text-[#1d1d1d] font-light tracking-wide">
              <img src="/ed.png" className='w-[20px] inline-block' alt="" /> {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-[#6e6e6e] line-through text-sm ml-3 font-light">
                <img src="/ed.png" className='w-[20px] inline-block' alt="" /> {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          {/* Note discrète sur la TVA */}
          <p className="text-[#6e6e6e] text-xs font-light tracking-wide mt-1">
            Price incl. VAT
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default LuxuryProductCard;