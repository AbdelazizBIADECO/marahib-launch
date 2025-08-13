import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Star, Users, Award, Gift, Clock, Shield, Crown, Zap, Heart } from 'lucide-react';
import CountdownTimer from '../components/ui/CountdownTimer';
import EmailForm from '../components/ui/EmailForm';
import AnimatedText from '../components/ui/AnimatedText';
import { featuredProducts } from '../data/products';

const LaunchPage: React.FC = () => {
  const launchDate = new Date('2025-09-01T00:00:00');

  const features = [
    {
      title: 'Curated Collections',
      sectionTitle: 'Products',
      gradient: 'from-stone-600 to-stone-800',
    },
    {
      title: 'Virtual Showrooms',
      sectionTitle: 'Designers',
      gradient: 'from-stone-500 to-stone-700',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Al-Mansouri',
      role: 'Interior Designer, Dubai',
      quote: 'Finally, a platform that understands luxury furniture. The virtual showrooms are revolutionary.',
      avatar: '/sarah-al-mansouri.jpeg',
    },
    {
      name: 'Ahmed Hassan',
      role: 'Architect, Abu Dhabi',
      quote: 'The quality and curation is unmatched. This will change how we source furniture for our projects.',
      avatar: '/ahmed-hassan.jpeg',
    },
    {
      name: 'Lina Haddad',
      role: 'Luxury Home Owner',
      quote: 'I\'ve been waiting for something like this. The designer pieces are absolutely stunning.',
      avatar: '/lina-haddad.jpeg',
    },
  ];

  const animatedPhrases = [
    'Luxury Discovery',
    'Effortless Style',
    'Inspired Living',
    'Seamless Shopping',
    'Curated Design',
    'Home Elegance',
    'Refined Living',
    'Intelligent Style',
    'All-in-One Luxury',
    'Design Without Limits'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-stone-50 to-stone-100 relative overflow-hidden">
      {/* Minimalist Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/6 left-1/4 w-96 h-96 bg-gradient-to-r from-stone-100/30 to-stone-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-stone-50/30 to-stone-100/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-stone-100/20 to-stone-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-1 h-1 bg-stone-400/50 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-40 right-32 w-2 h-2 bg-stone-300/60 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-stone-500/40 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="py-8">
          <div className="container-custom">
            <div className="flex justify-between items-center">
              <Link 
                to="/" 
                className="hover:opacity-90 transition-all duration-300 cursor-pointer"
              >
                <img 
                  src="/Design sans titre.png" 
                  alt="Marahb" 
                  className="h-16 md:h-20 w-auto object-contain"
                />
              </Link>
              <div className="flex items-center space-x-6">
                <div className="hidden md:flex items-center beige-accent backdrop-blur-sm rounded-full px-6 py-3 border border-stone-200/50">
                  <Clock className="w-4 h-4 text-stone-600 mr-3" />
                  <span className="text-stone-700 text-sm font-medium tracking-wide">Coming Soon</span>
                </div>
                <div className="text-stone-600 text-sm font-medium tracking-wide">
                  September 1st, 2025
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container-custom py-8 md:py-12">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-8 py-4 beige-accent backdrop-blur-sm rounded-full text-stone-800 text-sm font-medium mb-8 border border-stone-200/50 shadow-lg"
            >
              <img src="/Design sans titre.svg" alt="Marahb" className="w-5 h-5 mr-3 animate-pulse" />
              <span className="beige-text font-semibold tracking-[0.1em] uppercase">luxury furniture marketplace</span>
              <span className="ml-3 px-3 py-1 bg-gradient-to-r from-stone-200/60 to-stone-300/60 rounded-full text-xs font-bold text-stone-800 shadow-inner tracking-wide">AI Powered</span>
            </motion.div>

            {/* Full-width Main Headline with Background Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center filter blur-sm"
                  style={{ backgroundImage: 'url(/Image.jpeg)' }}
                >
                </div>
                <h1 className="relative z-10 font-didot text-4xl md:text-6xl lg:text-7xl leading-tight py-24 px-8 text-center" style={{ minHeight: 'auto' }}>
                  <span className="text-white tracking-wide drop-shadow-lg">
                    The Future of
                  </span>
                  <br />
                  <AnimatedText 
                    phrases={animatedPhrases}
                    speed={2500}
                    className="min-h-[1.2em] flex items-center justify-center text-white"
                  />
                </h1>
              </div>
            </motion.div>

            {/* Email Form - Moved Higher */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="bg-gradient-to-br from-white/80 via-stone-50/80 to-stone-100/80 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-stone-200/50 shadow-2xl relative overflow-hidden">
                {/* Animated border */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-stone-100/30 via-stone-200/30 to-stone-100/30 rounded-t-3xl blur-sm animate-pulse" />
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-red-500 mr-3 animate-pulse" />
                    <span className="text-stone-600 text-base font-medium tracking-wide">Step into the World of Marahb</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-didot beige-text mb-4 tracking-wide">
                    Be the First to Know
                  </h3>
                  <EmailForm />
                </div>
              </div>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100" alt="Designer 1" className="w-10 h-10 rounded-full border-2 border-stone-200/50 object-cover" />
                    <img src="https://images.pexels.com/photos/3184466/pexels-photo-3184466.jpeg?auto=compress&cs=tinysrgb&w=100&h=100" alt="Designer 2" className="w-10 h-10 rounded-full border-2 border-stone-200/50 object-cover" />
                    <img src="https://images.pexels.com/photos/3184467/pexels-photo-3184467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100" alt="Designer 3" className="w-10 h-10 rounded-full border-2 border-stone-200/50 object-cover" />
                    <img src="https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=100&h=100" alt="Designer 4" className="w-10 h-10 rounded-full border-2 border-stone-200/50 object-cover" />
                    <img src="https://images.pexels.com/photos/3184301/pexels-photo-3184301.jpeg?auto=compress&cs=tinysrgb&w=100&h=100" alt="Designer 5" className="w-10 h-10 rounded-full border-2 border-stone-200/50 object-cover" />
                  </div>
                  <span className="ml-4 text-stone-600 text-base font-medium tracking-wide">100+ designers waiting</span>
                </div>
                <div className="flex items-center">
                  <img src="/93583.png" alt="100+ designers waiting" className="h-6 w-auto" />
                  <span className="ml-3 text-stone-600 text-base font-medium tracking-wide">100k+ products</span>
                </div>
              </div>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-didot beige-text mb-4 tracking-wide">
                Launching In
              </h2>
              <CountdownTimer targetDate={launchDate} />
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-16"
            >
              <h3 className="text-2xl md:text-3xl font-didot beige-text mb-8 tracking-wide">
                What Industry Leaders Are Saying
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className="bg-gradient-to-br from-white/70 to-stone-50/70 backdrop-blur-sm rounded-xl p-6 border border-stone-200/50 hover:border-stone-300/70 transition-all duration-300 hover:transform hover:scale-105 shadow-lg"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-stone-200/50"
                      />
                      <div className="text-left">
                        <h4 className="text-stone-800 font-medium text-base">{testimonial.name}</h4>
                        <p className="text-stone-600 text-sm tracking-wide">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-stone-600 text-sm italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex text-stone-500 mt-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-8 mb-16"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  className="w-full bg-gradient-to-br from-white/70 to-stone-50/70 backdrop-blur-sm rounded-xl p-8 border border-stone-200/50 hover:border-stone-300/70 transition-all duration-300 hover:transform hover:scale-105 group shadow-lg"
                >
                  <h4 className="text-2xl font-didot text-stone-800 mb-6 tracking-wide text-center">
                    {feature.sectionTitle}
                  </h4>
                  
                  {/* Products Grid - Only show for Products section */}
                  {feature.sectionTitle === 'Products' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0">
                      {featuredProducts.slice(0, 4).map((product, productIndex) => (
                        <div
                          key={product.id}
                          className="relative overflow-hidden bg-white"
                          style={{ minHeight: '400px' }}
                        >
                          <div className="block h-full">
                            {/* Image avec fond blanc pur */}
                            <div className="relative aspect-square overflow-hidden bg-white flex items-center justify-center">
                              <div className="absolute inset-0 bg-gradient-to-b from-gray-200/90 to-white/80 pointer-events-none z-0" />
                              <img 
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105 relative z-10"
                                style={{ padding: '10%' }}
                              />
                            </div>

                            {/* Informations produit - typographie raffinée */}
                            <div className="bg-white flex flex-col justify-center px-6 py-4">
                              {/* Designer */}
                              <p className="text-[#6e6e6e] text-sm font-light tracking-wide uppercase" style={{ letterSpacing: '0.05em' }}>
                                {product.designer}
                              </p>
                              
                              {/* Nom du produit */}
                              <h3 className="text-[#1d1d1d] font-light leading-tight tracking-wide text-lg mt-1 mb-2" style={{ letterSpacing: '0.025em' }}>
                                {product.name}
                              </h3>
                              
                              {/* Prix */}
                              <div className="flex items-baseline justify-center">
                                <span className="text-[#1d1d1d] font-light tracking-wide">
                                  AED {product.price.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                  <span className="text-[#6e6e6e] line-through text-sm ml-3 font-light">
                                    AED {product.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>
                              
                              {/* Note discrète sur la TVA */}
                              <p className="text-[#6e6e6e] text-xs font-light tracking-wide mt-1 text-center">
                                Price incl. VAT
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Designers Grid - Only show for Designers section */}
                  {feature.sectionTitle === 'Designers' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        {
                          id: 'sarah-al-mansouri',
                          name: 'Sarah Al-Mansouri',
                          location: 'Dubai',
                          description: 'Award-winning interior designer specializing in contemporary luxury spaces with Middle Eastern influences.',
                          image: '/sarah-al-mansouri.jpeg'
                        },
                        {
                          id: 'ahmed-hassan',
                          name: 'Ahmed Hassan',
                          location: 'Abu Dhabi',
                          description: 'Renowned architect and furniture designer known for blending traditional craftsmanship with modern aesthetics.',
                          image: '/ahmed-hassan.jpeg'
                        },
                        {
                          id: 'lina-haddad',
                          name: 'Lina Haddad',
                          location: 'Al Ain',
                          description: 'Creative director and luxury home curator with expertise in creating personalized living experiences.',
                          image: '/lina-haddad.jpeg'
                        }
                      ].map((designer, designerIndex) => (
                        <div
                          key={designer.id}
                          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
                        >
                          {/* Photo de profil */}
                          <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-stone-200/50">
                            <img 
                              src={designer.image}
                              alt={designer.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Nom du designer */}
                          <h3 className="text-[#1d1d1d] font-light leading-tight tracking-wide text-lg mb-1 text-center" style={{ letterSpacing: '0.025em' }}>
                            {designer.name}
                          </h3>
                          
                          {/* Location */}
                          <p className="text-[#6e6e6e] text-sm font-light tracking-wide uppercase text-center mb-3" style={{ letterSpacing: '0.05em' }}>
                            {designer.location}
                          </p>
                          
                          {/* Description */}
                          <p className="text-[#6e6e6e] text-sm font-light leading-relaxed text-center">
                            {designer.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchPage;