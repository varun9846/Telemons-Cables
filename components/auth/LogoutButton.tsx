"use client";

import { useRouter } from "next/navigation";
import {supabase} from "@/lib/supabase";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
  const {error}=  await supabase.auth.signOut();
    router.push("/");
    if (error) {
      console.log("Logout error", error);
    }
 
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;