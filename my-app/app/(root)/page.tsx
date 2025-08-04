"use client"
import {useEffect,useState} from "react";
import {User} from "@/app/constants"
export default function Home()
{
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/GetUser');
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };
    fetchUser();
  }, []);
  return (
    <div>
      Home
      {user?<p>Hello {user.fullName}</p>:null}
    </div>
  );
}
