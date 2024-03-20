import { redirect } from "next/navigation";
import { ComponentProps } from "react";

import LogoutIcon from "@/app/components/icons/logout-icon";
import { createClient } from "@/utils/supabase/server";
type Props = ComponentProps<"button">;

const LogoutButton = async ({ ...props }: Props) => {
  const signOut = async () => {
    "use server";

    const supabase = createClient();

    await supabase.auth.signOut();

    redirect("/");
  };

  return (
    <form action={signOut}>
      <button {...props} id={"log-out"} type={"submit"}>
        {props.children} <LogoutIcon size={"20"} />
      </button>
    </form>
  );
};

export default LogoutButton;
