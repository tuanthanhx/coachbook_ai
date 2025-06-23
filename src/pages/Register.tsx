import LayoutSimple from '@/components/LayoutSimple';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <LayoutSimple>
      <div className="flex flex-col h-screen justify-center max-w-[340px] mx-auto">
        <h1 className="mb-2 text-2xl font-bold">Sign Up</h1>
        <p className="mb-8">Just a few quick things to get started</p>
        <form className="flex flex-col space-y-4">
          <label>
            <Input type="email" name="email" placeholder="Email" className="h-11 px-4 rounded-full bg-white" />
          </label>
          <label>
            <Input type="password" name="password" placeholder="Password" className="h-11 px-4 rounded-full bg-white" />
          </label>
          <label>
            <Input type="password" name="confirm-password" placeholder="Confirm Password" className="h-11 px-4 rounded-full bg-white" />
          </label>
          <Button type="submit" className="button-primary w-full h-11 mt-4 rounded-full bg-blue-500 text-white font-bold">
            Sign Up
          </Button>
        </form>
        <div className="absolute left-0 right-0 bottom-10 w-full text-center">Already have an account? <Link to="/login" className="font-bold">Sign In</Link></div>
      </div>

    </LayoutSimple>
  );
};

export default Register;
