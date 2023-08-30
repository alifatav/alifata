'use client'

import { useState } from 'react';
import { useAuth } from '@alifata/app/context/AuthContext';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { user, login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  if(user) return router.push('/');

  return (
    <div className="flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-md shadow-lg">
        <h2 className="text-white text-2xl text-center mb-4">▶️masuk</h2>
        <form onSubmit={handleEmailLogin} className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-2 rounded-md text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 rounded-md text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full">
            kirim
          </button>
        </form>

        <div className="mb-4 border-t-2 border-dashed border-white"></div>
        
        <p className='my-4 text-center'>atau masuk dengan :</p>
        
        <button
         onClick={loginWithGoogle}
         className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full"
        >
         Google
        </button>
      </div>
    </div>
  );
};

export default Login;
