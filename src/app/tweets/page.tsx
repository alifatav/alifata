import TweetForm from "./TweetForm";
import TweetPosts from "./TweetPosts";

const pageinfo = {
 title: "Randomthing Happen 🔥",
 subtitle: "#tweet #threads",
}

export default function Page(){

 return (
  <div className="flex items-center justify-center">
   <div className="container">

    <div className="flex flex-col items-center justify-center mb-2">
     <h1 className="text-3xl font-semibold text-center">{pageinfo.title}</h1>
     <h2 className="text-lg text-gray-600 text-center mt-1 italic">{pageinfo.subtitle}</h2>
    </div>

    <TweetForm />
    <TweetPosts />

   </div>
  </div>
 )
}