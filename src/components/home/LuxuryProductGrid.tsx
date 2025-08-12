import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { featuredProducts } from '../../data/products';
import LuxuryProductCard from '../product/LuxuryProductCard';

const LuxuryProductGrid: React.FC = () => {
  // Limiter à 4 produits seulement pour la grille
  // const products = featuredProducts.slice(0, 4);
  const [products, setProducts] = useState([])
  const getProcucts = async () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/products?limit=3`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setProducts(json.data);
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(()=>{
    getProcucts();
  }, [])
  // const products = getProcucts()
  return (
    <section className="w-full">
      {/* En-tête de section */}
      {/* Grid sans marges ni espaces - style Louis Vuitton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 mb-12">
        {products.map((product: any, index) => (
          <LuxuryProductCard
            key={product.id}
            product={product}
            index={index}
            showGradient={true}
            variant="minimal"
            useCustomImage={false}
          />
        ))}
      </div>

      {/* Bouton mobile */}
      <div className="md:hidden text-center mt-8">
        <Link
          to="/category/all"
          className="inline-flex items-center bg-black text-white px-6 py-3 font-light hover:bg-gray-900 transition-colors"
        >
          View All Products
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </section>
  );
};

export default LuxuryProductGrid;