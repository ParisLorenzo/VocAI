import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const useRedirectAfterLogin = () => {
  const location = useLocation();
  const { login } = useAuth();
  
  // Get the path the user was trying to access
  const from = location.state?.from?.pathname || '/';
  
  const handleLogin = async (email: string, password: string) => {
    return await login(email, password, from);
  };
  
  return {
    from,
    handleLogin,
    wasRedirected: !!location.state?.from
  };
};
