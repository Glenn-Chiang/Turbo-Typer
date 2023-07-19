import { DocumentData, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default async function getScores(userId: string | undefined) {
  if (!userId) {
    return [];
  }
  try {
    const scoreDocs = await getDocs(collection(db, 'users', userId, 'scores'));
    const scores: DocumentData[] = [];
    scoreDocs.forEach(doc => scores.push(doc.data()))
    return scores;
  } catch (error) {
    console.log('Error getting scores: ', error);
    return [];
  }
}