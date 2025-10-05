
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { user, loading, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else if (profile && profile.role !== 'admin') {
        // Redirect non-admin users or show an unauthorized message
        // For now, we just log them out and redirect to login
        navigate('/login');
      }
    }
  }, [user, loading, profile, navigate]);

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />
      </div>
    );
  }

  if (user && profile.role === 'admin') {
    return children;
  }

  // This will be briefly visible before the redirect kicks in
  return null;
};

export default ProtectedRoute;
