'use client'

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
 const {user, logout} = useAuth();
 const [isOpen, setIsOpen] = useState(false);

 return (
  <nav className="fixed top-0 left-0 right-0 shadow-md bg-black p-4 z-10">
   <div className="container mx-auto flex items-center justify-between">
    
    {/* BRAND NAME */}
    <div className="text-white font-semibold text-lg">
     <Link href="/">🔥alifata</Link>
    </div>

    {/* MENU */}
    <ul className="flex space-x-4">
     {/* WHEN USER ALREADY LOGIN */}
     {user && (
      <div className="relative">
       <button
         onClick={() => setIsOpen(!isOpen)}
         className="text-white hover:bg-blue-500 focus:outline-none p-1 rounded-md"
       >
         📑menu
       </button>
       {isOpen && (
         <div className="absolute right-0 mt-2 w-48 py-2 bg-white text-gray-800 rounded-md shadow-lg">
          <button onClick={() => setIsOpen(!isOpen)} className="absolute right-0 top-0 text-black hover:bg-red-500 focus:outline-none">
           <svg
             className="w-5 h-5 fill-current"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
           >
             <path d="M18 6L6 18M6 6l12 12" />
           </svg>
          </button>

          <li className="block px-4 py-2">
           <Link href='#'>{user.displayName}</Link>
          </li>
          <li className="block px-4 py-2 hover:bg-green-500 hover:cursor-pointer">
           <button onClick={()=> logout()}>🐞keluar</button>
          </li>
        </div>
       )}
      </div>
     )}

     {/* USER AUTH */}
     {!user && (
      <>
       <li className='hover:bg-blue-500 focus:outline-none p-1 rounded-md'>
        <Link href="/register">📃daftar</Link>
       </li>
       <li className='hover:bg-blue-500 focus:outline-none p-1 rounded-md'>
        <Link href="/login">▶️masuk</Link>
       </li>
      </>
     )}
     
    </ul>
   </div>
  </nav>
 );
};

export default Navbar;
