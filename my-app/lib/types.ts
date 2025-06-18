import { User as FirebaseUser } from "firebase/auth";

export interface UserData {
  uid: string;
  email: string | null;
  name?: string;
  avatar?: string;
  role: "merchant" | "consumer";
}

export interface AppUser extends FirebaseUser {
  name?: string;
  avatar?: string;
  role?: "merchant" | "consumer";
} 