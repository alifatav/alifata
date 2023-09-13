"use client"

import { useEffect, useState } from "react";
import TweetForm from "./TweetForm";
import { TweetData, getTweets, createTweet } from "./services";
import TweetCard from "./TweetCard";
import { useAuth } from "@alifata/app/context/AuthContext";
import toast from "react-hot-toast";

const pageinfo = {
 title: "Randomthing Happen 🔥",
 subtitle: "#tweet #threads",
}

export default function Page(){
 const [tweets, setTweets] = useState<TweetData[]>([]);
 const { user } = useAuth();
 const [text, setText] = useState('');

 useEffect(() => {
  async function getData() {
   const { tweets } = await getTweets();
   setTweets(tweets)
  }

  getData();
 }, []);

 const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent) => {
  e.preventDefault();
  if(text.length == 0) return toast("write something first", {icon: "😡"});
  
  try {
   if(!user) return toast('need login firts to post tweet', {icon: "😠"});    
   
   setTweets([{
    id: Date.now().toString(), 
    text, 
    createdAt: Date.now().toString(), 
    uid: user.uid
   }, ...tweets]);

   await createTweet(user.uid, text);

   setText('');
   toast.success('tweet created successfully 🎉');

  } catch (error) {
   toast.error('tweet failed to create 🥲')
  }
 };

 return (
  <div className="flex items-center justify-center">
   <div className="container">

    <div className="flex flex-col items-center justify-center mb-2">
     <h1 className="text-3xl font-semibold text-center">{pageinfo.title}</h1>
     <h2 className="text-lg text-gray-600 text-center mt-1 italic">{pageinfo.subtitle}</h2>
    </div>

    <TweetForm text={text} setText={setText} onSubmit={onSubmit} />
    
    <div>
     {tweets.map(tweet => <TweetCard tweet={tweet} key={tweet.id} />)}
    </div>

   </div>
  </div>
 )
}