import { auth } from "../firebase-config";
import { getWeight } from "../FirebaseCalls/GetWeight";

export default async function RunningMET2(mins) {
  const userID = auth.currentUser.uid;
  const MET = 8.3;

  const weight = await getWeight(userID);
  console.log("weight: "+weight)
  const result = parseInt(mins * MET * (weight/60))
  console.log("result: "+ result)
  return result;
}