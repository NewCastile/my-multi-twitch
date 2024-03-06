import { redirect } from "next/navigation";

import { INITIAL_PAGE_ROUTE } from "@/constants";
import { createClient } from "@/utils/supabase/server";

import LoginView from "../components/views/login";

const Login = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined | null };
}) => {
  const { message, status } = searchParams;

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className={"flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md"}>
        <LoginView {...{ message, status }} />
      </div>
    );
  } else {
    redirect(`${INITIAL_PAGE_ROUTE}`);
  }
};

export default Login;
