'use client'

import { useAuth } from "@alifata/app/context/AuthContext"
import { useRouter } from "next/navigation";

export default function Login(){
 const { user, loginWithGoogle } = useAuth();
 const router = useRouter();

 if(user) return router.push('/not-found')

 return (
  <div className="flex items-center justify-center">
   <div className="bg-gray-800 p-8 rounded-md shadow-lg">
    <h2 className="text-white text-2xl text-center mb-4">📑daftar</h2>        
    
    <div className="mb-4 border-t-2 border-dashed border-white"></div>
    
    <p className='my-4 text-center'>daftar akun dengan :</p>
    <button
     onClick={loginWithGoogle}
     className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full"
    >
     Google
    </button>
   </div>

  </div>
 )
}