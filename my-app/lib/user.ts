import { getDatabase, ref, get } from "firebase/database";
import {auth} from "@/lib/firebase"

export const getUserRole = async () => {
  const uid=auth.currentUser?.uid;
  console.log(`correct uid : ${uid}`);
  const db = getDatabase();
  const snap = await get(ref(db, `users/${uid}`));
  return snap.exists() ? snap.val().userType : null;
};
