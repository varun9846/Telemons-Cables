"use client";

import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import { useLoader } from "@/context/LoaderContext";

const LogoutButton = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { showLoader, hideLoader } = useLoader();

  const handleLogout = async () => {
    try {
      showLoader();
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      hideLoader();
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-telemons-blue-primary hover:text-telemons-orange-primary transition-colors duration-300 font-semibold"
    >
      Logout
    </button>
  );
};

export default LogoutButton;