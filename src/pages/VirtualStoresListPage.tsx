import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Bell, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { virtualStores } from '../data/virtualStores';

const VirtualStoresListPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Background Content - Blurred */}
      <div className="absolute inset-0">
        <div className="py-12 bg-gray-50 filter blur-sm opacity-30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl mb-4 text-gray-900">Explore Virtual Stores</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience our furniture collections in immersive 3D environments. Browse different 
                styles and visualize how our pieces work together in realistic settings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {virtualStores.map((store) => (
                <div key={store.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={store.image} 
                      alt={store.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-stone-600/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      360° Tour
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-medium text-xl mb-2 text-gray-900">{store.name}</h3>
                    <p className="text-gray-600 mb-4">{store.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="ml-1 font-medium">{store.rating}</span>
                        <span className="ml-1 text-gray-500 text-sm">({store.reviews} reviews)</span>
                      </div>
                      <span className="text-sm font-medium px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {store.style}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      


























      
    </div>
  );
};

export default VirtualStoresListPage;