type Icon = {
 type: string,
 emoji: string,
}

type Status = {
  id: string, 
  name: string, 
  color: string,
}

type Person = {
 object: string | 'user',
 id: string
}

type Formula = {
 type: string | "string",
 string: string | null,
}

type AuthorProperty = {
 id: string,
 type: string | 'formula',
 formula: Formula
}

type StatusProperty = {
 id: string, 
 type: string, 
 status: Status,
}

type CreatedTime = {
 id: string, 
 type: string, 
 created_time: string,
}

type UpdatedTime = {
 id: string, 
 type: string, 
 last_edited_time: string,
}

type NotionPageProperties = {
 Title: {id: string, type: string, title: [{type: string, text: {content: string, link: any}, annotations: {bold: boolean, italic: boolean, strikethrough: boolean, underline: boolean, code: boolean, color: string}, plain_text: string, href: any}]},
 Description: {id: string, type: string, rich_text: [{type: string, text: {content: string, link: any}, annotations: {bold: boolean, italic: boolean, strikethrough: boolean, underline: boolean, code: boolean, color: string}, plain_text: string, href: any}]},
 Status: StatusProperty,
 Tags: {id: string, type: string, multi_select: [{id: string, name: string, color: string}]}
 Slug: {id: string, type: string, formula: {type: string, string: string}},
 Author: FormulaProperty,
}

export type NotionPage = {
 object: string,
 id: string,
 created_time: string,
 last_edited_time: string,
 created_by: Person,
 last_edited_by: Person,
 cover: { type: string, external: { url: string }},
 icon: { type: string, emoji: string },
 parent: { type: string, database_id: string },
 archived: boolean,
 properties: NotionPageProperties,
 url: string,
 public_url: string | null,
}

export type BlogPost = {
 id: string,
 cover: string,
 icon: string,
 title: string,
 description: string,
 status: string,
 tags: [
  {
   id: string, 
   name: string, 
   color: string
  }
 ],
 slug: string,
 author: string,
 updatedAt: string,
 createdAt: string,
};