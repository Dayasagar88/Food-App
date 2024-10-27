import { useState } from 'react'
import { Input } from '../ui/input'
import { Loader, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';


const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const loading = false;


  return (
    <div className='flex items-center justify-center min-h-screen'>
        <form className='flex border bg-white shadow-lg flex-col gap-5 md:p-8 w-full max-w-md rounded-lg'>
          <div className='text-center'>
            <h1 className='text-2xl font-extrabold mb-2'>Forgot Password</h1>
            <p className='text-gray-600 text-sm'>Enter your email registered address to reset password</p>
          </div>
          <div className='relative flex items-center'>
            <Input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your registered email address'
            className='pl-10 focus-visible:ring-1'
            />
            <Mail className=' absolute left-2 pointer-events-none text-gray-500'/>
          </div>
          <Button disabled={loading} className='bg-orange hover:bg-hoverOrange'>{loading ? <><Loader className='w-5 h-5 animate-spin mr-1'/>Please wait...</> :"Send Reset Link"}</Button>
          <p>Back to{" "} <Link to="/login" className='text-blue-500 hover:underline'>Login</Link></p>
        </form>
    </div>
  )
}

export default ForgotPassword