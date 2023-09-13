"use client"

import { useState } from 'react';
import { useAuth } from "@alifata/app/context/AuthContext";
import AlreadyAuth from "@alifata/app/components/AlreadyAuth";

export default function Page(){
 const { user, loginWithGoogle, login } = useAuth();
 const [signInMode, setSignInMode] = useState(true);
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const handleEmailLogin = async (e: React.FormEvent) => {
   e.preventDefault();
   await login(email, password);
 };

 if(user) return <AlreadyAuth displayName={user.displayName}/>

 return (
  <div className="flex items-center justify-center">
   <div className="p-4 rounded-lg shadow-lg bg-black">
    <h2 className="text-2xl text-center mb-4 font-bold text-white ">{signInMode ? "Sign In": "Sign Up"}</h2>

    {signInMode && (
     <div>
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
         sign in
       </button>
      </form>
     </div>
    )}
    
    
    <div className=" text-white">
     <p className='my-4'>😊 {signInMode ? "or Sign In with": "Sign Up with"} :</p>

     <button onClick={loginWithGoogle} className="bg-red-500  px-4 py-2 rounded-md hover:bg-red-600">
      Google
     </button>
    </div>
    
    <div className="mt-5 text-center">
     <button onClick={()=>setSignInMode(!signInMode)} className="py-1 px-3 rounded-lg shadow-lg bg-green-500 transition duration-300 hover:scale-105 hover:text-white">
       {signInMode ? "Sign Up (if u dont have account yet)": "Sign In (if u already have account)"} 🤔  
     </button>
    </div>
   </div>
  </div>
 )
 
}