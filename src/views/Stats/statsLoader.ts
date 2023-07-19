import { Params } from "react-router-dom";
import getScores from "../../crud/getScores";

export default async function statsLoader({params}: {params: Params}) {
  const userId = params.userId;
  const scores = await getScores(userId);
  return scores;
}