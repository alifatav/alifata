'use client'

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react";

export default function ProtectedRoute({children}: {children: React.ReactNode}){
 const {user, loading } = useAuth();
 const router = useRouter()

 useEffect(() => {
  if (!loading && !user) {
    router.push('/login'); 
  }
 }, [user, loading]);

if (loading) {
  return <p className="flex items-center justify-center">Loading...</p>;
}

return children;
}