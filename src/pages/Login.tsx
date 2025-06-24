import LayoutSimple from '@/components/layouts/LayoutSimple';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { toast } from "sonner";
import { useState } from 'react';
import { login } from '@/lib/apiService';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { fetchUserProfile, storeTokens } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);

      // Use AuthContext to store tokens
      storeTokens(response.token, response.refreshToken);

      // Fetch user profile
      await fetchUserProfile();

      // Redirect to dashboard
      window.location.href = '/';
    } catch (err) {
      toast.error(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <LayoutSimple>
      <div className="flex flex-col h-screen justify-center max-w-[340px] mx-auto">
        <h1 className="mb-2 text-2xl font-bold">Sign In</h1>
        <p className="mb-8">Welcome back to your favorite coaches</p>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              className="h-11 px-4 rounded-full bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="h-11 px-4 rounded-full bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <Button
            type="submit"
            className="button-primary w-full h-11 mt-4 rounded-full bg-blue-500 text-white font-bold"
          >
            Sign In
          </Button>
        </form>
        <div className="absolute left-0 right-0 bottom-10 w-full text-center">
          Don't have an account? <Link to="/register" className="font-bold">Sign Up</Link>
        </div>
      </div>
    </LayoutSimple>
  );
};

export default Login;
