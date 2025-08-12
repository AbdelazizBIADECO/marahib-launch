import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Package, 
  Heart, 
  Settings, 
  CreditCard, 
  MapPin, 
  Bell, 
  Shield, 
  Truck, 
  Clock, 
  CheckCircle, 
  Star,
  Eye,
  Download,
  Edit,
  Plus,
  ArrowRight,
  Calendar,
  Phone,
  Mail,
  Home,
  Gift,
  HelpCircle,
  LogOut,
  ChevronRight,
  Filter,
  Search,
  X,
  MessageCircle
} from 'lucide-react';

const CustomerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [orderFilter, setOrderFilter] = useState('all');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check if user is authenticated and fetch user data
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        // User is not authenticated, redirect to signin
        navigate('/signin', { 
          state: { message: 'Please sign in to access your dashboard.' }
        });
        return;
      }

      // Fetch user data using the token
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData.user);
        } else {
          // Token is invalid, clear it and redirect
          localStorage.removeItem('access_token');
          navigate('/signin', { 
            state: { message: 'Session expired. Please sign in again.' }
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // On error, also redirect to signin
        localStorage.removeItem('access_token');
        navigate('/signin', { 
          state: { message: 'An error occurred. Please sign in again.' }
        });
      }
    };

    checkAuth();
  }, [navigate]);

  // Handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      const token = localStorage.getItem('access_token');
      
      // Call the logout API
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Clear stored token
        localStorage.removeItem('access_token');
        
        // Redirect to signin page
        navigate('/signin', { 
          state: { message: 'You have been successfully logged out.' }
        });
      } else {
        console.error('Logout failed');
        // Even if API fails, clear token and redirect
        localStorage.removeItem('access_token');
        navigate('/signin');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, clear token and redirect
      localStorage.removeItem('access_token');
      navigate('/signin');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Mock data - in real app, this would come from API
  const user = {
    name: currentUser?.user_metadata?.first_name 
      ? `${currentUser.user_metadata.first_name} ${currentUser.user_metadata.last_name || ''}`.trim()
      : currentUser?.email?.split('@')[0] || 'User',
    email: currentUser?.email || 'user@example.com',
    phone: currentUser?.user_metadata?.phone || '+971 50 123 4567',
    avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    memberSince: '2023',
    totalOrders: 12,
    totalSpent: 45670,
    loyaltyPoints: 2284,
    tier: 'Gold'
  };

  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 4777,
      items: 3,
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-01-20',
      products: [
        { name: 'Modern Sectional Sofa', image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=200&h=200', price: 4777 }
      ]
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 1195,
      items: 1,
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-01-18',
      products: [
        { name: 'Glass Coffee Table', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=200&h=200', price: 1195 }
      ]
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-05',
      status: 'processing',
      total: 2199,
      items: 2,
      trackingNumber: null,
      estimatedDelivery: '2024-01-25',
      products: [
        { name: '6-Drawer Dresser', image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=200&h=200', price: 2199 }
      ]
    }
  ];

  const wishlistItems = [
    {
      id: 'wish_1',
      name: 'Executive Office Desk',
      designer: 'Herman Miller',
      price: 4595,
      originalPrice: 5330,
      image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      inStock: true
    },
    {
      id: 'wish_2',
      name: 'Modern Table Lamp',
      designer: 'Schoolhouse',
      price: 695,
      originalPrice: 915,
      image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      inStock: true
    }
  ];

  const addresses = [
    {
      id: 'addr_1',
      type: 'home',
      name: 'Home',
      address: 'Villa 123, Al Wasl Road',
      city: 'Dubai',
      country: 'UAE',
      isDefault: true
    },
    {
      id: 'addr_2',
      type: 'office',
      name: 'Office',
      address: 'Office 456, Business Bay',
      city: 'Dubai',
      country: 'UAE',
      isDefault: false
    }
  ];

  const paymentMethods = [
    {
      id: 'card_1',
      type: 'visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    },
    {
      id: 'card_2',
      type: 'mastercard',
      last4: '8888',
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const filteredOrders = orderFilter === 'all' ? orders : orders.filter(order => order.status === orderFilter);

  const handleViewOrderDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setShowOrderDetails(true);
  };

  const selectedOrder = orders.find(order => order.id === selectedOrderId);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'support', label: 'Help & Support', icon: HelpCircle },
  ];

  // If user is not loaded yet, show loading
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-2xl text-gray-900">My Account</h1>
              <p className="text-gray-600">Manage your orders, preferences, and account settings</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="hidden md:block">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.tier} Member</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Logout"
              >
                {isLoggingOut ? (
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <LogOut className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content - Rest of the component remains the same */}
          <div className="lg:col-span-3">
            {/* All the existing tab content remains exactly the same */}
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">{user.totalOrders}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-6 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Total Spent</p>
                        <p className="text-2xl font-bold text-gray-900"><img src="/ed.png" className='w-[20px] inline-block' alt="" /> {user.totalSpent.toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Star className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Loyalty Points</p>
                        <p className="text-2xl font-bold text-gray-900">{user.loyaltyPoints}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-6 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Heart className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Wishlist Items</p>
                        <p className="text-2xl font-bold text-gray-900">{wishlistItems.length}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-medium text-gray-900">Recent Orders</h3>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="text-sm text-black hover:underline flex items-center"
                    >
                      View All
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <button 
                        key={order.id} 
                        onClick={() => setActiveTab('orders')}
                        className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <img 
                            src={order.products[0].image} 
                            alt={order.products[0].name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.products[0].name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900"><img src="/ed.png" className='w-[20px] inline-block' alt="" /> {order.total.toLocaleString()}</p>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">{order.status}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-medium text-gray-900 mb-6">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Package className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="font-medium text-gray-900">Track Orders</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('wishlist')}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Heart className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="font-medium text-gray-900">View Wishlist</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('support')}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <HelpCircle className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="font-medium text-gray-900">Get Support</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* All other tabs remain exactly the same - orders, wishlist, addresses, payment, profile, support */}
            {/* ... rest of the component content is identical ... */}
          </div>
        </div>
      </div>

      {/* Order Details Modal - remains the same */}
      {/* ... modal content ... */}
    </div>
  );
};

export default CustomerDashboard;