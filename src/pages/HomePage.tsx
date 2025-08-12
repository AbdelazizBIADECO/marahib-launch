import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Heart, ShoppingCart, Eye, Award, Sparkles } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { featuredProducts } from '../data/products';
import { virtualStores } from '../data/virtualStores';
import AddToCartButton from '../components/cart/AddToCartButton';
import Hero from '../components/home/Hero';
import LuxuryProductGrid from '../components/home/LuxuryProductGrid';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HomePage: React.FC = () => {
  const categories = [
    {
      id: 'bathroom',
      name: 'Bathroom',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      description: 'Luxury bathroom furniture and accessories'
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      description: 'Create your dream bedroom sanctuary'
    },
    {
      id: 'decor',
      name: 'Decor',
      image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      description: 'Elegant decorative pieces and accessories'
    },
    {
      id: 'dining-room',
      name: 'Dining Room',
      image: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      description: 'Sophisticated dining furniture'
    },
    {
      id: 'living-room',
      name: 'Living Room',
      image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      description: 'Premium living room collections'
    },
    {
      id: 'office',
      name: 'Office',
      image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      description: 'Executive office furniture'
    }
  ];

  const seasonalCollections = [
    {
      id: 'lounge-leisure',
      name: 'Lounge & Leisure',
      image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
      description: 'Comfort meets style'
    },
    {
      id: 'easy-finds',
      name: 'Easy Finds',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
      description: 'Quick style solutions'
    },
    {
      id: 'refresh',
      name: 'Refresh',
      image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
      description: 'Revitalize your space'
    }
  ];

  const bestSellers = featuredProducts.filter(p => p.featured).slice(0, 6);

  return (
    <div className="bg-white">
      {/* Original Hero Section with Quiz */}
      <Hero />

      {/* Product Categories - Horizontal Slider */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated collections designed for every space in your home
            </p>
          </motion.div>

          {/* Desktop Horizontal Scroll */}
          <div className="hidden md:block">
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-80 group cursor-pointer"
                >
                  <Link to={`/category/${category.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-serif text-xl mb-1 text-white font-bold">{category.name}</h3>
                        <p className="text-sm text-white/80">{category.description}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Vertical Stack */}
          <div className="md:hidden grid grid-cols-1 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/category/${category.id}`}>
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-4">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-serif text-xl mb-1 text-white">{category.name}</h3>
                      <p className="text-sm text-white/80">{category.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Best Sellers */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2 className="font-serif text-3xl md:text-4xl mb-2">Best Sellers</h2>
              <p className="text-gray-600">Our most coveted pieces</p>
            </div>
            <Link 
              to="/category/all" 
              className="hidden md:flex items-center text-gray-600 hover:text-black transition-colors font-medium"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </motion.div>

          {/* Grille de produits style Louis Vuitton */}
          <LuxuryProductGrid />
        </div>
      </section>

      {/* Majlis Feature */}
      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080)' }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              Create the Perfect
              <br />
              <span style={{ color: '#EED8C1' }}>Gathering Space</span>
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Transform your home into a sanctuary of hospitality with our exclusive Majlis collection. 
              Where tradition meets contemporary luxury.
            </p>
            <Link 
              to="/category/majlis"
              style={{ backgroundColor: '#EED8C1' }}
              className="inline-flex items-center hover:opacity-90 text-gray-800 px-8 py-4 font-medium transition-all duration-300 uppercase tracking-wide"
            >
              Shop Majlis Collection
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Seasonal Collection Grid */}
      <section className="py-16" style={{ backgroundColor: '#FAF6E7' }}>
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-gray-800">Seasonal Collections</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Discover our carefully curated seasonal selections designed to refresh and inspire your living spaces
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {seasonalCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/category/${collection.id}`}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
                    <img 
                      src={collection.image} 
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="font-serif text-2xl mb-2 text-white font-bold">{collection.name}</h3>
                      <p className="text-white/80 mb-4">{collection.description}</p>
                      <div className="flex items-center text-sm font-medium">
                        <span>Explore Collection</span>
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
{/* Virtual Showrooms */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Virtual Showrooms</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience our furniture in immersive 3D environments. Step into luxury from anywhere.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {virtualStores.slice(0, 3).map((store, index) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer relative"
              >
                <div className="relative">
                  {/* Blurred Content */}
                  <div className="filter blur-sm opacity-60 pointer-events-none">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-4">
                      <img 
                        src={store.image} 
                        alt={store.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {store.has360Tour && (
                          <span style={{ backgroundColor: '#EED8C1' }} className="text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            360° Tour
                          </span>
                        )}
                        {store.isLuxury && (
                          <span style={{ backgroundColor: '#EED8C1' }} className="text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                            Luxury
                          </span>
                        )}
                        <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {store.style}
                        </span>
                      </div>

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-serif text-xl mb-1 text-white font-bold">{store.name}</h3>
                        <p className="text-sm text-white/80 mb-2">{store.description}</p>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-amber-400 fill-current" />
                          <span className="ml-1 text-sm">{store.rating}</span>
                          <span className="ml-1 text-sm text-white/70">({store.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Coming Soon Badge - Centered */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-stone-100 to-stone-200 rounded-full shadow-xl border border-stone-300/50 backdrop-blur-sm">
                      <span className="text-stone-700 font-semibold text-sm uppercase tracking-wide">Coming Soon</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="mb-8">
              <Sparkles className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h2 className="font-serif text-3xl md:text-4xl mb-4">Stay Inspired</h2>
              <p className="text-gray-600 text-lg">
                Be the first to discover new collections, exclusive offers, and design inspiration from marahb.
              </p>
            </div>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-black text-gray-900"
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-8 py-3 font-medium hover:bg-gray-900 transition-colors uppercase tracking-wide"
              >
                Subscribe
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-4">
              Join over 50,000 design enthusiasts. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;