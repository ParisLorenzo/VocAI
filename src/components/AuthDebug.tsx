import { useAuth } from '@/contexts/AuthContext';

const AuthDebug = () => {
  const { user, isAuthenticated, lastVisitedPath } = useAuth();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-xs z-50">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div className="space-y-1">
        <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
        <div>User: {user?.name || 'None'}</div>
        <div>Last Path: {lastVisitedPath || 'None'}</div>
        <div>LocalStorage User: {localStorage.getItem('vocai_user') ? 'Yes' : 'No'}</div>
        <div>LocalStorage Path: {localStorage.getItem('vocai_last_path') || 'None'}</div>
      </div>
    </div>
  );
};

export default AuthDebug;
