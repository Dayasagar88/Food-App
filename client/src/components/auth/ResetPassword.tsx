import  { useState } from 'react'
import { Input } from '../ui/input'
import { Loader, LockKeyhole } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';


const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const loading = false;


  return (
    <div className='flex items-center justify-center min-h-screen'>
        <form className='flex flex-col gap-5 border bg-white shadow-lg md:p-8 w-full max-w-md rounded-lg'>
          <div className='text-center'>
            <h1 className='text-2xl font-extrabold mb-2'>Reset Password</h1>
            <p className='text-gray-600 text-sm'>Enter a new password to reset your password</p>
          </div>
          <div className='relative flex items-center'>
            <Input
            type='text'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder='Enter new password'
            className='pl-10 focus-visible:ring-1'
            />
            <LockKeyhole className=' absolute left-2 pointer-events-none text-gray-500'/>
          </div>
          <Button disabled={loading} className='bg-orange hover:bg-hoverOrange'>{loading ? <><Loader className='w-5 h-5 animate-spin mr-1'/>Please wait...</> :"Reset"}</Button>
          <p>Back to{" "} <Link to="/login" className='text-blue-500 hover:underline'>Login</Link></p>
        </form>
    </div>
  )
}

export default ResetPassword