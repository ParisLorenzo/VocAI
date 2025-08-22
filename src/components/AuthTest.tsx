import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AuthTest = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  const handleTestLogin = async () => {
    const success = await login('test@example.com', '123456');
    console.log('Login result:', success);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Auth Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <strong>Status:</strong> {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
        </div>
        {user && (
          <div>
            <strong>User:</strong> {user.name} ({user.email})
          </div>
        )}
        <div className="flex space-x-2">
          <Button onClick={handleTestLogin} disabled={isAuthenticated}>
            Test Login
          </Button>
          <Button onClick={logout} disabled={!isAuthenticated}>
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthTest;
