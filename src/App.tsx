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
          <Route path="/launch" element={<LaunchPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/new' element={<NewArrivalsPage />} />
            <Route path="furniture" element={<FurniturePage />} />

            {/* Auth callback */}
            <Route path="auth/callback" element={<AuthCallback />} />

            {/* OPTION 1: Use specific pages for room categories (if they have custom layouts) */}
            {/* Uncomment these if you want to keep your specific room pages for "Shop All" links */}
            {/*
            <Route path="category/bedroom" element={<BedroomPage />} />
            <Route path="category/living-room" element={<LivingRoomPage />} />
            <Route path="category/dining-room" element={<DiningRoomPage />} />
            <Route path="category/office" element={<OfficePage />} />
            <Route path="category/outdoor" element={<OutdoorPage />} />
            */}

            {/* OPTION 2: Use generic CategoryPage for all categories (RECOMMENDED) */}
            {/* This handles all category URLs from your navbar */}
            <Route path="category/:roomType" element={<CategoryPage />} />
            <Route path="category/:roomType/:subcategory" element={<CategoryPage />} />

            {/* Legacy/Special category routes (if needed) */}
            <Route path="category/sofa-seating" element={<SofaSeatingPage />} />
            <Route path="category/modular" element={<ModularPage />} />
            <Route path="category/beds" element={<BedroomPage />} /> {/* Redirect beds to bedroom */}

            {/* Product routes */}
            <Route path="product/:id" element={<ProductPage />} />
            
            {/* Cart and checkout */}
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="order-confirmation" element={<OrderConfirmationPage />} />
            
            {/* Virtual stores */}
            <Route path="virtual-stores" element={<VirtualStoresListPage />} />
            <Route path="virtual-stores/:id" element={<VirtualStorePage />} />
            
            {/* Other pages */}
            <Route path="shop-the-look" element={<ShopTheLookPage />} />
            <Route path="designers" element={<DesignersPage />} />
            <Route path="designers/:id" element={<DesignerDetailPage />} />
            <Route path="designer-room-styles" element={<DesignerRoomStylesPage />} />
            
            {/* Footer pages */}
            <Route path="about" element={<AboutUsPage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms-and-conditions" element={<TermsAndConditionsPage />} />
            <Route path="shipping-delivery" element={<ShippingDeliveryPage />} />
            <Route path="returns-exchanges" element={<ReturnsExchangesPage />} />
            <Route path="warranty" element={<WarrantyPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;