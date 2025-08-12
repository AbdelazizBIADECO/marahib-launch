import React from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback = (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}) => {
  const { isAuthenticated, loading } = useRequireAuth();

  if (loading) {
    return <>{fallback}</>;
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useRequireAuth
  }

  return <>{children}</>;
};