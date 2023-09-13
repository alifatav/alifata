import { TweetData, getTweets } from "./services";

type TweetCardProps = {
 tweet: TweetData
}

async function getData(){
 const tweets = await getTweets();

 return {
  tweets
 }
}

export default async function TweetPosts(){
 const { tweets } = await getData();
 
 return (
  <div className="my-5">
   {tweets.map(tweet => <TweetCard tweet={tweet} key={tweet.id} />)}
  </div>
 )
}

export function TweetCard({tweet}: TweetCardProps){
 return (
  <div className='max-w-sm mx-auto overflow-hidden' key={tweet.id}>
   <p className='text-black p-1 mt-1'>{tweet.text}</p>
  </div>
 )
}