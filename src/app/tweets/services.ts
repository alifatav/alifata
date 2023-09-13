import { db } from '@alifata/app/lib/firebase';
import { getDocs, collection, serverTimestamp, addDoc, QueryDocumentSnapshot, query, orderBy, limit, Timestamp } from 'firebase/firestore';

export type TweetData = {
 id: string;
 text: string;
 uid: string | undefined;
 createdAt: any;
}

const docsRef = collection(db, 'tweets');
const docLimit = 5;

export async function getTweets(){
 const q = query(
  docsRef, 
  orderBy('createdAt', 'desc'), 
  limit(docLimit)
 );
 
 const querySnapshot = await getDocs(q);
 const tweets: TweetData[]  = querySnapshot.docs.map(
  (doc: QueryDocumentSnapshot) => ({ id: doc.id, ...doc.data() } as TweetData)
 );

 return tweets;
}

export async function  createTweet(uid: string, text: string) {
 const newData = { 
  uid, text, 
  createdAt: serverTimestamp()
 }

 await addDoc(
  docsRef,
  newData
 )
}