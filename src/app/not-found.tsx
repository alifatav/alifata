import Link from "next/link"

export default function RedirectToHome(){
 return (
  <div className="flex items-center justify-center">
   <div className="text-center">
    <h1>maaf halaman tidak ditemukan 😓</h1>
    <button className="p-1 rounded-md hover:bg-blue-500 border-solid border-blue-500">
     <Link href='/'>
      🏠halaman utama
     </Link>
    </button>
   </div>
  </div>
 )
}