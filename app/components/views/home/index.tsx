import Link from "next/link";

import { INITIAL_PAGE_ROUTE } from "@/constants";

import { SignInButton } from "./lib/sign-in-button";
import SignInCard from "./lib/sign-in-card";

const HomeView = async ({
  message,
  status,
}: {
  message?: string | null;
  status?: string | null;
}) => {
  return (
    <div className={"flex flex-col items-center justify-center space-y-2"}>
      <SignInCard>
        <div className={"flex flex-col items-center justify-center gap-4"}>
          <SignInButton />
          <p>Or</p>
          <Link className={"btn-md btn-monokai-violet text-lg"} href={INITIAL_PAGE_ROUTE}>
            Continue
          </Link>
        </div>
      </SignInCard>
      {status && message && (
        <div className={"flex flex-col items-center justify-center text-gray-400"}>
          <p>Error: {status}</p>
          <p>{message}</p>
          <p>Please try again later</p>
        </div>
      )}
    </div>
  );
};

export default HomeView;
