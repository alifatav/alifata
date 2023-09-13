import Link from "next/link"

export default function NotFound(){
 return (
  <div className="flex items-center justify-center">
   <div>
    <h1 className="text-2xl font-bold mb-4">sorry, page not found 😓</h1>
    <span>back to 👉🏻 </span>
    <button className="p-4 rounded-lg shadow-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 transition-none duration-300 hover:scale-105 hover:text-white">
     <Link href='/'>
      🏠homepage
     </Link>
    </button>
   </div>
  </div>
 )
}