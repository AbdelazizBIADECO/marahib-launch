import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Truck, RotateCcw, Shield, ChevronRight } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import AddToCartButton from '../components/cart/AddToCartButton';
import { Product } from '../types';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getProduct = async () => {
    const url = `https://marahib-dashboard.vercel.app/api/product?id=${id}`;
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      
      // Transform the API data to match your Product interface
      const transformedProduct: Product = {
        id: json.product.id,
        name: json.product.name,
        description: json.product.description,
        price: json.product.price,
        originalPrice: json.product.retail_price || undefined,
        designer: json.product.brand || 'Unknown Designer',
        category: json.product.category.toLowerCase(),
        subcategory: json.product.subcategory,
        images: [json.product.primary_image, ...json.product.additional_images].filter(Boolean),
        colors: json.product.colors?.map((color: string, index: number) => ({
          name: color.replace(/'/g, ''), // Remove quotes from color names
          hex: getColorHex(color.replace(/'/g, '')) // Convert color name to hex
        })) || [{ name: 'Default', hex: '#000000' }],
        materials: json.product.materials || '',
        dimensions: {
          length: json.product.dimensions_l || 0,
          width: json.product.dimensions_w || 0,
          height: json.product.dimensions_h || 0
        },
        weight: json.product.weight || 0,
        rating: 4.5, // Default rating since it's not in API
        reviews: 12, // Default reviews since it's not in API
        inStock: json.product.stock_quantity > 0,
        stockQuantity: json.product.stock_quantity,
        features: [],
        warranty: json.product.warranty || '',
        careInstructions: json.product.care_instructions || '',
        assemblyRequired: json.product.assembly_required || false,
        style: json.product.style || '',
        roomType: json.product.room_type || '',
        brand: json.product.brand || '',
        sku: json.product.sku || '',
        countryOfOrigin: json.product.country_of_origin || '',
        finish: json.product.finish || '',
        shippingCost: json.product.shipping_cost || 0,
        isNew: json.product.new_in || false,
        tags: json.product.tag ? [json.product.tag] : []
      };
      
      setProduct(transformedProduct);
      console.log('Transformed product:', transformedProduct);
    } catch (error: any) {
      console.error('Error fetching product:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert color names to hex values
  const getColorHex = (colorName: string): string => {
    const colorMap: { [key: string]: string } = {
      'red': '#FF0000',
      'blue': '#0000FF',
      'green': '#00FF00',
      'yellow': '#FFFF00',
      'orange': '#FFA500',
      'purple': '#800080',
      'pink': '#FFC0CB',
      'brown': '#A52A2A',
      'black': '#000000',
      'white': '#FFFFFF',
      'gray': '#808080',
      'grey': '#808080',
      'beige': '#F5F5DC',
      'cream': '#F5F5DC',
      'navy': '#000080',
      'maroon': '#800000',
      'teal': '#008080',
      'silver': '#C0C0C0',
      'gold': '#FFD700'
    };
    
    const normalizedColor = colorName.toLowerCase().trim();
    return colorMap[normalizedColor] || '#000000';
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= (product?.stockQuantity || 1)) {
      setQuantity(value);
    }
  };

  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
  };

  // Get the current image to display
  const getCurrentImage = () => {
    if (!product || !product.images || product.images.length === 0) {
      return '';
    }
    return product.images[selectedImage] || product.images[0];
  };

  if (loading) {
    return (
      <div className="container-custom py-20 text-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-custom py-20 text-center">
        <h2 className="font-hatton text-3xl mb-4">Product Not Found</h2>
        <p className="mb-8">
          {error ? `Error: ${error}` : "The product you're looking for doesn't exist or has been removed."}
        </p>
        <Link to="/" className="btn-primary">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container-custom py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-8">
          <Link to="/" className="text-gray-500 hover:text-primary-500 transition-colors">
            Home
          </Link>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <Link to={`/category/${product.category}`} className="text-gray-500 hover:text-primary-500 transition-colors capitalize">
            {product.category}
          </Link>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-square rounded-lg overflow-hidden gradient-bg">
              <img
                src={getCurrentImage()}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleImageSelect(index)}
                    className={`aspect-square rounded-md overflow-hidden gradient-bg border-2 transition-all ${
                      selectedImage === index ? 'border-primary-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <p className="text-gray-500">{product.designer}</p>
              <h1 className="font-hatton text-3xl md:text-4xl mt-1 mb-2">{product.name}</h1>
              <div className="flex items-center">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 fill-gray-300'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">{product.reviews} reviews</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-2xl font-medium">
                <img src="/ed.png" className='w-[20px] inline-block' alt="" /> {product.price.toLocaleString()}
              </p>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-gray-500 line-through text-lg">
                  <img src="/ed.png" className='w-[20px] inline-block' alt="" /> {product.originalPrice.toLocaleString()}
                </p>
              )}
              <p className="text-sm text-gray-600">Price incl. VAT</p>
              {product.stockQuantity <= 5 && (
                <p className="text-sm text-orange-600">Only {product.stockQuantity} left in stock!</p>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">Colors</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={color.name + '-' + index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-8 h-8 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all ${
                        selectedColor === index ? 'border-black ring-2 ring-black ring-offset-2' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">Selected: {product.colors[selectedColor]?.name}</p>
              </div>
            )}

            {/* Add to Cart Section */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-12 h-10 text-center border-x border-gray-300 focus:outline-none"
                    min="1"
                    max={product.stockQuantity}
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    disabled={quantity >= product.stockQuantity}
                  >
                    +
                  </button>
                </div>

                <AddToCartButton
                  product={product}
                  selectedColor={product.colors[selectedColor]}
                  quantity={quantity}
                  variant="primary"
                  size="lg"
                  className="flex-1"
                />

                <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                  <Heart size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-start space-x-3">
                <Truck size={20} className="text-primary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Free Shipping</h4>
                  <p className="text-xs text-gray-500">On orders over <img src="/ed.png" className='w-[20px] inline-block' alt="" /> 500</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RotateCcw size={20} className="text-primary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">30-Day Returns</h4>
                  <p className="text-xs text-gray-500">Hassle-free returns</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield size={20} className="text-primary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">{product.warranty || '2-Year'} Warranty</h4>
                  <p className="text-xs text-gray-500">Manufacturer guarantee</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500 flex-shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                <div>
                  <h4 className="font-medium text-sm">Secure Payment</h4>
                  <p className="text-xs text-gray-500">Encrypted transactions</p>
                </div>
              </div>
            </div>

            {/* Additional Product Details */}
            {(product.materials || product.dimensions || product.assemblyRequired) && (
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-medium mb-4">Product Details</h3>
                <div className="space-y-2 text-sm">
                  {product.materials && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Material:</span>
                      <span className="font-medium">{product.materials}</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimensions:</span>
                      <span className="font-medium">
                        {product.dimensions.length}L × {product.dimensions.width}W × {product.dimensions.height}H cm
                      </span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-medium">{product.weight} kg</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assembly Required:</span>
                    <span className="font-medium">{product.assemblyRequired ? 'Yes' : 'No'}</span>
                  </div>
                  {product.sku && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">SKU:</span>
                      <span className="font-medium">{product.sku}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;