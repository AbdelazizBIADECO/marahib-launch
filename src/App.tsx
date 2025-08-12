import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import VirtualStorePage from './pages/VirtualStorePage';
import VirtualStoresListPage from './pages/VirtualStoresListPage';
import ShopTheLookPage from './pages/ShopTheLookPage';
import DesignersPage from './pages/DesignersPage';
import DesignerDetailPage from './pages/DesignerDetailPage';
import DesignerRoomStylesPage from './pages/DesignerRoomStylesPage';
import LaunchPage from './pages/LaunchPage';
import FurniturePage from './pages/FurniturePage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AboutUsPage from './pages/AboutUsPage';
import FAQPage from './pages/FAQPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import ShippingDeliveryPage from './pages/ShippingDeliveryPage';
import ReturnsExchangesPage from './pages/ReturnsExchangesPage';
import WarrantyPage from './pages/WarrantyPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CustomerDashboard from './pages/CustomerDashboard';

// Specific category pages (if you want to keep them for special layouts)
import BedroomPage from './pages/BedroomPage';
import SofaSeatingPage from './pages/SofaSeatingPage';
import LivingRoomPage from './pages/LivingRoomPage';
import DiningRoomPage from './pages/DiningRoomPage';
import OfficePage from './pages/OfficePage';
import OutdoorPage from './pages/OutdoorPage';
import ModularPage from './pages/ModularPage';
import { AuthProvider } from './contexts/AuthContext';
import AuthCallback from './pages/auth/callback';
import NewArrivalsPage from './pages/NewArrivalsPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="*" element={<LaunchPage />} />
          
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;