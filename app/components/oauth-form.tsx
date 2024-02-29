"use client";

import { createClient } from "@/utils/supabase/client";

export default function OAuthForm() {
  const handleLoginWithGithub = async () => {
    const supabase = createClient();

    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <button className={"w-full"} onClick={handleLoginWithGithub}>
      Login With Github
    </button>
  );
}
