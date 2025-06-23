import LayoutSimple from '@/components/layouts/LayoutSimple';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <LayoutSimple>
      <div className="flex flex-col h-screen justify-center max-w-[340px] mx-auto">
        <h1 className="mb-2 text-2xl font-bold">Sign In</h1>
        <p className="mb-8">Welcome back to your favorite coaches</p>
        <form className="flex flex-col space-y-4">
          <label>
            <Input type="email" name="email" placeholder="Email" className="h-11 px-4 rounded-full bg-white" />
          </label>
          <label>
            <Input type="password" name="password" placeholder="Password" className="h-11 px-4 rounded-full bg-white" />
          </label>
          <Button type="submit" className="button-primary w-full h-11 mt-4 rounded-full bg-blue-500 text-white font-bold">
            Sign In
          </Button>
        </form>
        <div className="absolute left-0 right-0 bottom-10 w-full text-center">Don't have an account? <Link to="/register" className="font-bold">Sign Up</Link></div>
      </div>

    </LayoutSimple>
  );
};

export default Login;
