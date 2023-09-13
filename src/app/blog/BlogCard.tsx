import Link from "next/link";
import { BlogPost } from "./types";

type BlogCardProps = {
 post: BlogPost
}

export default function BlogCard({post}: BlogCardProps){
 return (
  <Link href={`/blog/${post.slug}`} legacyBehavior>
   <a className="max-w-sm bg-black border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 transition duration-300 hover:scale-110">
    <div className="flex-shrink-0 cursor-pointer">
     <img className="rounded-t-lg h-60 w-full object-cover" src={post.cover} alt="" />
    </div>
    <div className="p-5">
     <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">{post.icon} {post.title}</h5>
     <p className="mb-3 font-normal text-gray-100 dark:text-gray-400">{post.description}</p>
     <span className="block my-2 space-x-4">
      {post.tags.map(tag => (
       <span key={tag.id} className={`bg-${tag.color}-500 text-white px-2 py-1 text-xs rounded-sm`}>{tag.name}</span>
      ))}
     </span>
    </div>
   </a>
  </Link>
  

 )
}