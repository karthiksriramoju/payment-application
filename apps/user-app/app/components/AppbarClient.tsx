"use client";
import {signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Appbar } from "@repo/ui/appbar";

export function AppbarClient() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    // Sign out without redirecting automatically
    await signOut({ redirect: false });

    // Redirect to home page after sign out
    router.push("/signin");
  };

  return (
    <div>
      <Appbar 
        onSignin={() => signIn()} 
        onSignout={handleSignOut} 
        user={session?.user} 
      />
    </div>
  );
}
