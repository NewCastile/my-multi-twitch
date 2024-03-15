"use client";

import Image from "next/image";
import { ComponentProps } from "react";

import twitchIcon from "@/app/components/icons/twitch-icon.svg";
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
      className={
        "btn-md btn-monokai-violet inline-flex w-max flex-row items-center justify-center gap-4 text-lg"
      }
      formAction={signInWithTwitch}
      {...props}
      type={"submit"}
    >
      Twitch <Image alt={"twitch-icon"} className={"size-6"} src={twitchIcon} />
    </button>
  );
};
