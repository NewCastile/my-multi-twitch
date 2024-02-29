"use client";

import { ComponentProps } from "react";

import { createClient } from "@/utils/supabase/client";

type Props = ComponentProps<"button">;

export const SignInButton = ({ ...props }: Props) => {
  const signInWithTwitch = () => {
    const supabase = createClient();

    supabase.auth.signInWithOAuth({
      provider: "twitch",
      options: {
        scopes: "openid user:read:follows",
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <button
      className={"btn-md btn-monokai-violet text-lg w-max"}
      formAction={signInWithTwitch}
      {...props}
      type={"submit"}
    >
      Sign In with Twitch
    </button>
  );
};
