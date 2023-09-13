'use client'

import React from 'react';

type TweetFormProps = {
 text: string,
 setText: Function,
 onSubmit: React.FormEventHandler<HTMLFormElement>,
}

export default function TweetForm({text, setText, onSubmit}: TweetFormProps) {
 
 return (
  <div className="flex items-center justify-center round-md p-4">
   <form className="flex items-center shadow-md p-4 rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition duration-300 hover:scale-105 hover:text-white" onSubmit={onSubmit}>
    <input
     type="text"
     className="border p-2 mr-2 rounded-md text-black"
     placeholder="write something..."
     value={text}
     onChange={(e) => setText(e.target.value)}
    />
    <button type='submit' className="p-2 font-bold">
     create
    </button>
   </form>    
  </div>
 )
}