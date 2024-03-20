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
    <div className={"flex flex-col items-center justify-center gap-8"}>
      <SignInCard>
        <div className={"flex flex-col items-center justify-center gap-4 text-monokai-white"}>
          <SignInButton
            className={
              "btn-md btn-monokai-black inline-flex w-max flex-row items-center justify-center gap-4 text-lg font-bold"
            }
          >
            Continue with Twitch
          </SignInButton>
          <div className={"flex w-full flex-row items-center justify-center gap-4"}>
            <div className={"h-[2px] w-full rounded-full bg-gray-500"} />
            <p>Or</p>
            <div className={"h-[2px] w-full rounded-full bg-gray-500"} />
          </div>
          <Link
            aria-label={"Continue without login"}
            className={"btn-md text-lg font-bold"}
            href={INITIAL_PAGE_ROUTE}
          >
            Continue without login
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
