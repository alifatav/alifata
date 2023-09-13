import Link from "next/link"

export default function AlreadyAuth({displayName}: {displayName: string | undefined | null}){
 return (
  <div className="flex items-center justify-center">
   <div>
    <p className="text-2xl mb-4">you have logged in as: <b>{displayName || 'user'}</b></p>
    <span>back to 👉🏻 </span>
    <button className="p-4 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition duration-300 hover:scale-105 hover:text-white">
     <Link href="/">
      🏡 homepage    
     </Link>
    </button>

   </div>
  </div>
 )
}