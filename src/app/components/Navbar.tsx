'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from "@alifata/app/context/AuthContext";
import { useState, Fragment } from 'react';

export default function Navbar(){
 const {user, loading, logout} = useAuth();
 const [openPagesMenu, setOpenPagesMenu] = useState(false);
 const [openUserMenu, setOpenUserMenu] = useState(false);
 const pageLinks = [
  {label: "🏡Home", url: "/"},
  {label: "🗞️Blog", url: "/blog"},
  {label: "🛠️Portofolio", url: "/portofolio"},
 ]
 const userMenu = [
  {label: "Profile", url: "/profile"},
 ]

 return (
  <nav className="shadow-md bg-white border-gray-200 dark:bg-gray-900 fixed w-full z-20 top-0 left-0">
   <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link href="/" className="flex items-center">
     <Image src="/logo.png" className="h-8 mr-3" alt="logo" height={32} width={32} />
     <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">alifata🔥</span>
    </Link>
    
    <div className={`flex items-center ${!user ? "md:order-1": "md:order-2"}`}>
     {!loading && user && (
      <Fragment>
       <button onClick={() => setOpenUserMenu(!openUserMenu)} type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <Image src="/avatar1.jpg" alt="avatar" className="w-8 h-8 rounded-full" width={32} height={32}/>
       </button>

       <div className={`absolute z-50 right-0 md:right-2 top-16 md:top-12 mt-2 w-48 py-2 ${!openUserMenu && "hidden"} my-4 text-base list-none bg-black divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
        <div className="px-4 py-3">
         <button onClick={() => setOpenUserMenu(!openUserMenu)} className="absolute top-0 right-0 p-1 rounded-tr-lg rounded-bl-lg text-gray-400 hover:text-white hover:bg-red-600 focus:outline-none">
          <svg
            className="w-4 h-4 fill-current"
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
         <span className="block text-sm text-gray-100 dark:text-white">{user.displayName}</span>
         <span className="block text-sm  text-gray-300 truncate dark:text-gray-400">{user.email}</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
         {userMenu.map(menu => (
          <li key={menu.url}>
           <Link href={menu.url} className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{menu.label}</Link>
          </li>
         ))}
         <li onClick={logout}>
           <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign Out</a>
         </li>
         
        </ul>
       </div>
      </Fragment>
     )}
     
     <button onClick={() => setOpenPagesMenu(!openPagesMenu)} data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
      </svg>
     </button>

    </div>
  
    <div className={`items-center justify-between ${!openPagesMenu && "hidden"} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
     <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      {pageLinks.map(link => {
       const homeStyle = "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-gray-900 md:hover:text-green-500 md:p-0 md:dark:text-blue-500 transition duration-300 hover:scale-105";
       const othersStyle = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300 hover:scale-105";
       
       return (
         <li className={`${link.url == "/"? homeStyle: othersStyle}`} key={link.url}>
          <Link href={link.url}>{link.label}</Link>
         </li>
       )
      })}
      {!user && (
        <li className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300 hover:scale-105">
         <Link href="/authentication">📝Sing In</Link>
        </li>
       )}
     </ul>

    </div>

   </div>
  </nav>
 )
}