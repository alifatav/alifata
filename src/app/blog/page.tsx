import React from "react";
import { BlogPost } from "./types";
import BlogCard from "./BlogCard";
import { getBlogPosts } from "./services";

async function getData() {
 const posts = await getBlogPosts();
 
 return { posts }
}

// page element
export default async function Page() {
 const { posts } = await getData()

 return (
  <React.Fragment>
   <div className="min-h-screen">
    <div className="max-w-5xl mx-auto">
     <div className="flex items-center justify-center">
      <h1 className="font-extrabold text-xl md:text-4xl text-center">🗞️BLOGs</h1>
     </div>

     <div className="mt-12 max-w-md mx-auto grid gap-5 md:grid-cols-2 md:max-w-none">
      {
       posts.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
       ))
      }
     </div>

    </div>
   </div>
   
  </React.Fragment>
 )
}