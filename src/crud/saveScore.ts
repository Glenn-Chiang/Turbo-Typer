import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default async function saveScore(userId: string, wpm: number, mode: string, timeLimit: number, timestamp: Date) {
  const score = { wpm, mode, timeLimit, timestamp };
  await addDoc(collection(db, 'users', userId, 'scores'), score);
}