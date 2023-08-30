// DATA in Tweet Collection: createdAt, text

import { db } from '@alifata/app/lib/firebase';
import { serverTimestamp, addDoc, collection } from 'firebase/firestore';

// CREATE DATA
export async function createTweet(uid: string | undefined, text:string) {
 const data = {
  uid,
  text,
  createdAt: serverTimestamp(),
 }

 await addDoc(collection(db, 'tweets'), data);
}


// READ DATA
