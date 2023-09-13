import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { getBlogPostContent } from "../services";

async function getData(slug: string) { 
 const { content } = await getBlogPostContent(slug);

 return { content }
}

export default async function Page({ params }: { params: { slug: string }}) {
 const { content  } = await getData(params.slug);

 return (
  <main className="min-h-screen">
   <div className="max-w-4xl mx-auto">
    <div className="flex items-center p-2">
     <article className="prose lg:prose-xl">
      <ReactMarkdown>
       {content}
      </ReactMarkdown>
     </article>
    </div>
   </div>
  </main>
 )
}