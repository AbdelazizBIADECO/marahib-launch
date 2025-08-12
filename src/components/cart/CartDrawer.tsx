import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Truck, Shield, ArrowRight, Trash2, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import AuthCheckModal from '../AuthCheckModal';
import { designerRoomStyles } from '../../data/roomStyles';
import { designerProjects } from '../../data/designerProjects';
import { featuredProducts } from '../../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItemExpansion = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getItemDetails = (item: any) => {
    if (item.type === 'room-style') {
      const roomStyle = designerRoomStyles.find(rs => rs.id === item.roomStyleId);
      return roomStyle;
    } else if (item.type === 'designer-collection') {
      const project = designerProjects.find(p => p.id === item.designerCollectionId);
      return project;
    }
    return null;
  };

  const getIncludedProducts = (item: any) => {
    const details = getItemDetails(item);
    if (details && 'products' in details) {
      return featuredProducts.filter(product => details.products.includes(product.id));
    }
    return [];
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    // If authenticated, proceed directly to checkout
    setIsCheckingOut(true);
    onClose(); // Close the drawer
    navigate('/checkout');
    setIsCheckingOut(false);
  };

  const handleAuthSuccess = () => {
    // Close the auth modal first
    setShowAuthModal(false);
    
    // Small delay to ensure modal closes, then proceed to checkout
    setTimeout(() => {
      onClose(); // Close the drawer
      navigate('/checkout');
    }, 100);
  };

  const handleAuthClose = () => {
    setShowAuthModal(false);
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[61] flex flex-col"
          >
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                <h2 className="font-serif text-xl text-gray-900">
                  Shopping Cart ({cart.itemCount})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-600 mb-6">
                    Discover our curated furniture collections and add items to your cart.
                  </p>
                  <div
                    onClick={onClose}
                    className="bg-black cursor-pointer text-white px-6 py-3 font-medium hover:bg-gray-900 transition-colors uppercase tracking-wide"
                  >
                    Continue Shopping
                  </div>
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  {cart.items.map((item) => {
                    const itemDetails = getItemDetails(item);
                    const includedProducts = getIncludedProducts(item);
                    const isExpanded = expandedItems.includes(item.id);

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-gray-50 rounded-lg overflow-hidden"
                      >
                        <div className="flex gap-4 p-4">
                          <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                                  {item.name}
                                </h4>
                                <p className="text-xs text-gray-600">{item.designer}</p>
                                
                                {/* Type Badge */}
                                <div className="flex items-center gap-2 mt-1">
                                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                    item.type === 'product' ? 'bg-blue-100 text-blue-700' :
                                    item.type === 'room-style' ? 'bg-green-100 text-green-700' :
                                    'bg-purple-100 text-purple-700'
                                  }`}>
                                    {item.type === 'product' ? 'Individual Item' :
                                     item.type === 'room-style' ? 'Complete Room' :
                                     'Designer Collection'}
                                  </span>
                                </div>

                                {item.selectedColor && (
                                  <div className="flex items-center mt-1">
                                    <div
                                      className="w-3 h-3 rounded-full border border-gray-300 mr-2"
                                      style={{ backgroundColor: item.selectedColor.hex }}
                                    />
                                    <span className="text-xs text-gray-600">{item.selectedColor.name}</span>
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                <Trash2 className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center border border-gray-300 rounded">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 hover:bg-gray-100 transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 hover:bg-gray-100 transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <div className="text-right">
                                <p className="font-medium text-gray-900">
                                  <img src="/ed.png" className='w-[20px] inline-block' alt="" /> {(item.price * item.quantity).toLocaleString()}
                                </p>
                                {item.originalPrice && (
                                  <p className="text-xs text-gray-500 line-through">
                                    <img src="/ed.png" className='w-[20px] inline-block' alt="" /> {(item.originalPrice * item.quantity).toLocaleString()}
                                  </p>
                                )}
                                <p className="text-xs text-gray-500">Price incl. VAT</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Product Details for individual items */}
                        {item.type === 'product' && (
                          <div className="border-t border-gray-200 bg-white px-4 py-2">
                            <div className="flex items-center justify-between text-xs text-gray-600">
                              <div className="flex items-center">
                                <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                                <span>4.5 (12)</span>
                              </div>
                              <span>Added {new Date(item.addedAt || Date.now()).toLocaleDateString()}</span>
                            </div>
                          </div>
                        )}

                        {/* Expandable Details for Complete Designs */}
                        {(item.type === 'room-style' || item.type === 'designer-collection') && getItemDetails(item) && (
                          <>
                            <div className="px-4 pb-2">
                              <button
                                onClick={() => toggleItemExpansion(item.id)}
                                className="flex items-center justify-between w-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
                              >
                                <span className="font-medium">
                                  {item.type === 'room-style' ? 'View included furniture' : 'View design details'}
                                  {getIncludedProducts(item).length > 0 && ` (${getIncludedProducts(item).length} items)`}
                                </span>
                                {expandedItems.includes(item.id) ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </button>
                            </div>

                            <AnimatePresence>
                              {expandedItems.includes(item.id) && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="border-t border-gray-200 bg-white"
                                >
                                  <div className="p-4 space-y-3">
                                    {/* Features/What's Included */}
                                    {getItemDetails(item)?.features && (
                                      <div>
                                        <h5 className="font-medium text-gray-900 text-xs mb-2 uppercase tracking-wide">
                                          What's Included:
                                        </h5>
                                        <ul className="space-y-1">
                                          {getItemDetails(item)?.features.slice(0, 4).map((feature: string, index: number) => (
                                            <li key={index} className="flex items-start text-xs text-gray-600">
                                              <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                                              {feature}
                                            </li>
                                          ))}
                                          {getItemDetails(item)?.features.length > 4 && (
                                            <li className="text-xs text-gray-500 italic">
                                              + {getItemDetails(item)?.features.length - 4} more features
                                            </li>
                                          )}
                                        </ul>
                                      </div>
                                    )}

                                    {/* Individual Products (for room styles) */}
                                    {getIncludedProducts(item).length > 0 && (
                                      <div>
                                        <h5 className="font-medium text-gray-900 text-xs mb-2 uppercase tracking-wide">
                                          Furniture Pieces:
                                        </h5>
                                        <div className="grid grid-cols-2 gap-2">
                                          {getIncludedProducts(item).slice(0, 4).map((product) => (
                                            <div key={product.id} className="bg-gray-50 rounded p-2">
                                              <div className="aspect-square bg-white rounded mb-1 overflow-hidden">
                                                <img 
                                                  src={product.images[0]} 
                                                  alt={product.name}
                                                  className="w-full h-full object-contain"
                                                />
                                              </div>
                                              <p className="text-xs font-medium text-gray-900 line-clamp-1">
                                                {product.name}
                                              </p>
                                              <p className="text-xs text-gray-600">
                                                <img src="/ed.png" className='w-[20px] inline-block' alt="" /> {product.price.toLocaleString()}
                                              </p>
                                            </div>
                                          ))}
                                          {getIncludedProducts(item).length > 4 && (
                                            <div className="bg-gray-100 rounded p-2 flex items-center justify-center">
                                              <span className="text-xs text-gray-600 font-medium">
                                                +{getIncludedProducts(item).length - 4} more
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}

                                    {/* Designer Note */}
                                    {getItemDetails(item)?.designerNote && (
                                      <div className="bg-blue-50 p-3 rounded">
                                        <h5 className="font-medium text-gray-900 text-xs mb-1 uppercase tracking-wide">
                                          Designer's Note:
                                        </h5>
                                        <p className="text-xs text-gray-700 italic">
                                          "{getItemDetails(item)?.designerNote}"
                                        </p>
                                      </div>
                                    )}

                                    {/* Savings Information */}
                                    {item.originalPrice && (
                                      <div className="bg-green-50 p-3 rounded">
                                        <p className="text-xs font-medium text-green-800">
                                          You save <img src="/ed.png" className='w-[20px] inline-block' alt="" /> {((item.originalPrice - item.price) * item.quantity).toLocaleString()} 
                                          with this complete design package
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Shipping Info */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Truck className="w-4 h-4 mr-2" />
                    <span>
                      {cart.subtotal >= 500 ? 'Free shipping' : <><img src="/ed.png" className='w-[20px] inline-block' alt="" /> ${cart.shipping} shipping</>}
                    </span>
                  </div>
                  {cart.subtotal < 500 && (
                    <span className="text-gray-500">
                      <img src="/ed.png" className='w-[20px] inline-block' alt="" /> {(500 - cart.subtotal).toLocaleString()} more for free shipping
                    </span>
                  )}
                </div>

                {/* Order Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal (incl. VAT)</span>
                    <span className="font-medium"><img src="/ed.png" className='w-[20px] inline-block' alt="" /> {cart.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {cart.shipping === 0 ? 'Free' : <><img src="/ed.png" className='w-[20px] inline-block' alt="" /> ${cart.shipping.toLocaleString()}</>}
                    </span>
                  </div>
                  {cart.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">-<img src="/ed.png" className='w-[20px] inline-block' alt="" /> {cart.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-2 flex justify-between">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="font-bold text-lg text-gray-900">
                      <img src="/ed.png" className='w-[20px] inline-block' alt="" /> {cart.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Secure checkout with 256-bit SSL encryption</span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-black text-white py-4 px-6 font-medium hover:bg-gray-900 transition-all duration-300 uppercase tracking-wide flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={onClose}
                  className="block w-full text-center text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>

          {/* Auth Modal */}
          <AuthCheckModal
            isOpen={showAuthModal}
            onClose={handleAuthClose}
            onSuccess={handleAuthSuccess}
            title="Sign in to checkout"
            subtitle="Please sign in to complete your purchase"
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;