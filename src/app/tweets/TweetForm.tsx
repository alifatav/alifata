'use client'

import { useState, Fragment } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@alifata/app/context/AuthContext";
import { TweetData, createTweet } from "./services";
import { TweetCard } from "./TweetPosts";

export default function TweetForm() {
 const { user } = useAuth();
 const [text, setText] = useState('');
 const [newTweets, setNewTweets] = useState<TweetData[]>([]);
 
 const handleForm = async (e: React.FormEvent) => {
  e.preventDefault();
  if(text.length == 0) return toast("write something first", {icon: "😡"});
  
  try {
   if(!user) return toast('need login firts to post tweet', {icon: "😠"});    
   
   await createTweet(user.uid, text);
   setNewTweets([{
    id: Date.now().toString(), 
    text, 
    createdAt: Date.now().toString(), 
    uid: user.uid
   }, ...newTweets]);

   setText('');
   toast.success('tweet created successfully 🎉');

  } catch (error) {
   toast.error('tweet failed to create 🥲')
  }
 };

 return (
  <Fragment>
   <div className="flex items-center justify-center round-md ">
    <form className="flex items-center m-2 shadow-md p-4 rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition duration-300 hover:scale-105 hover:text-white" onSubmit={handleForm}>
     <input
      type="text"
      className="border p-2 mr-2 rounded-md text-black"
      placeholder="write something..."
      value={text}
      onChange={(e) => setText(e.target.value)}
     />
     <button type='submit' className="px-4 py-2 font-bold">
      create
     </button>
    </form>
   </div>

   <div className="mt-6">
    {newTweets.map(tweet => <TweetCard tweet={tweet} key={tweet.id}/>)}
   </div>
  </Fragment>
 )
}