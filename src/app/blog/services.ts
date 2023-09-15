import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { NotionPage, BlogPost } from "./types";

const notionSecret = process.env.NOTION_ACCESS_TOKEN;
const notionDatabaseId = process.env.NOTION_BLOG_POST_DATABASE_ID;
const notion = new Client({auth: notionSecret});
const n2m = new NotionToMarkdown({ notionClient: notion });
const blogLimit = 8;

export async function getBlogPosts(){
 if(!notionSecret || !notionDatabaseId) throw new Error('missing notion secret or DB-ID');

 const query = await notion.databases.query({ 
  database_id: notionDatabaseId,
  filter: {
   property: "Status",
   status: {
    equals: "Published"
   }
  },
  sorts: [
   { property: "Updated", direction: "descending"}
  ]
 });

 const notionPages = query.results as NotionPage[];

 const notionData: BlogPost[] = notionPages.map(page => {
  return {
   id: page.id,
   cover: page.cover.external.url,
   icon: page.icon.emoji,
   title: page.properties.Title.title[0].plain_text,
   description: page.properties.Description.rich_text[0].plain_text,
   slug: page.properties.Slug.formula.string,
   status: page.properties.Status.status.name,
   tags: page.properties.Tags.multi_select,
   author: page.created_by.id,
   updatedAt: page.last_edited_time,
   createdAt: page.created_time,
  }
 })

 return notionData;
}

export async function  getBlogPostContent(slug: string) {
 if(!notionSecret || !notionDatabaseId) throw new Error('missing notion secret or DB-ID');

 const response = await notion.databases.query({
  database_id: notionDatabaseId,
  filter: {
   property: 'Slug',
   formula: {
    string: {
     equals: slug
    }
   }
  }
 }) 

 if(!response.results[0]) {
  throw 'No results avaiable'
 }

 const page = response.results[0];

 const mdBlocks = await n2m.pageToMarkdown(page.id);
 const mdString = n2m.toMarkdownString(mdBlocks);

 const markdown = mdString.parent;
 
 return {
  content: markdown
 };
}