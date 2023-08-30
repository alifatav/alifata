'use client'

import type { Metadata } from 'next'
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

// firebase
import { db } from '@alifata/app/lib/firebase';
import { getDocs, collection, serverTimestamp, addDoc, QueryDocumentSnapshot, query, orderBy, limit, Timestamp } from 'firebase/firestore';

// #getTweetFromServer, #createTweet
// #TITLE, #FORM

interface Tweet {
 id: string;
 text: string;
 uid: string | undefined;
 createdAt: any;
}

export default function Tweets(){
 const title = 'Randomthing Happen 🔥';
 const subtitle = '#tweet #threads';
 const { user } = useAuth();
 const [text, setText] = useState('');
 const [data, setData] = useState<Tweet[]>([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {

  // #getTweetFromServer
  async function fetchData() {
   try {
    const q = query(collection(db, 'tweets'), orderBy('createdAt', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);
    const fetchedData: Tweet[]  = querySnapshot.docs.map(
     (doc: QueryDocumentSnapshot) => ({ id: doc.id, ...doc.data() } as Tweet)
    );
    setData(fetchedData);
    setLoading(false);
   } catch (error) {
    toast.error('gagal memdapatkan tweet dari server 😓')
   }
  }

  fetchData();
 }, [db])

 // #createTweet
 const handleForm = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
   const newData = {
    uid: user?.uid,
    text: text,
    createdAt: serverTimestamp(),
   }

   await addDoc(collection(db, 'tweets'), newData);
   setData([{uid: user?.uid, text: text, createdAt: 'right now', id: `rn-${Date.now()}`}, ...data])
   setText('');
   toast.success('tweet berhasil di buat🎉')
  
  } catch (error) {
   toast.error('tweet gagal di buat😓')
  }
 };

 return (
  <ProtectedRoute>
   <div className="container p-2">
   {/* #TITLE */}
   <div className="flex flex-col items-center justify-center mt-2">
    <h1 className="text-3xl font-semibold text-center">{title}</h1>
    <h2 className="text-lg text-gray-600 text-center mt-1 italic">{subtitle}</h2>
   </div>

   {/* #FORM */}
   <div className="flex items-center justify-center mt-2">
    <form className="flex items-center" onSubmit={handleForm}>
     <input
      type="text"
      className="border p-2 mr-2 rounded-md text-black"
      placeholder="Masukkan teks di sini"
      value={text}
      onChange={(e) => setText(e.target.value)}
     />
     <button type='submit' className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
      Kirim
     </button>
    </form>
   </div>

   {/* #CONTENT */}
   <div className="mt-2">
    {loading && <p>loading...</p>}
    {!loading && data.map(t => (
     <div className='max-w-sm mx-auto rounded-md overflow-hidden shadow-md' key={t.id}>
      <p className='text-gray-500 p-1'>🏷️{t.text}</p>
     </div>
    ))}
   </div>

   </div>
  </ProtectedRoute>
 )
}