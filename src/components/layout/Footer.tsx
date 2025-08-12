import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company info */}
          <div className="space-y-6">
            <div>
              <img 
                src="/Design sans titre.png" 
                alt="Marahb" 
                className="h-12 md:h-16 w-auto object-contain"
              />
            </div>
            <p className="text-gray-600 max-w-xs leading-relaxed">
              Curating the finest furniture designs from around the world, bringing elegance and sophistication to your home.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 text-gray-400 hover:text-black transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 text-gray-400 hover:text-black transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 text-gray-400 hover:text-black transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 text-gray-400 hover:text-black transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-6">
            <h4 className="font-medium text-black text-sm uppercase tracking-wide">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/category/living-room" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Living Room
                </Link>
              </li>
              <li>
                <Link to="/category/bedroom" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Bedroom
                </Link>
              </li>
              <li>
                <Link to="/category/dining" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Dining
                </Link>
              </li>
              <li>
                <Link to="/category/office" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Office
                </Link>
              </li>
              <li>
                <Link to="/category/outdoor" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Outdoor
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h4 className="font-medium text-black text-sm uppercase tracking-wide">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-black transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Warranty
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-medium text-black text-sm uppercase tracking-wide">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail size={16} className="text-gray-400 mr-3" />
                <span className="text-gray-600 text-sm">info@marahb.com</span>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="text-gray-400 mr-3" />
                <span className="text-gray-600 text-sm">+971 (0) 4 123 4567</span>
              </div>
            </div>
            <div className="pt-4">
              <h5 className="text-sm font-medium mb-4 text-black uppercase tracking-wide">Newsletter</h5>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black"
                />
                <button className="px-6 py-2 bg-black text-white hover:bg-gray-900 transition-colors text-sm font-medium uppercase tracking-wide">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()} Marahb. All rights reserved. All prices include VAT.
              </p>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="flex space-x-6 text-sm">
                <Link to="/privacy-policy" className="text-gray-600 hover:text-black transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="text-gray-600 hover:text-black transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;