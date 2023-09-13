import { TweetData, getTweets } from "./services";

type TweetCardProps = {
 tweet: TweetData
}

export default function TweetCard({tweet}: TweetCardProps){
 return (
  <div className='max-w-sm mx-auto overflow-hidden' key={tweet.id}>
   <p className='text-black p-1 mt-1'>{tweet.text}</p>
  </div>
 )
}