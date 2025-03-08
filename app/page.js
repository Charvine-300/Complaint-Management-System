"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/utils/ComplaintMgmtStore";

export default function Home() {
  const router = useRouter();
  const { accessToken } = useStore((state) => state); // Access the accessToken

  useEffect(() => {
    if (accessToken) {
      router.replace("/dashboard"); // Redirect to dashboard if logged in
    } else {
      router.replace("/auth/login"); // Redirect to login if no token
    }
  }, [accessToken, router]);

  return null; // No need to render anything since we are redirecting
}
