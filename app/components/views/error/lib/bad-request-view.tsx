import { ErrorViewComponentProps } from "@/types";

import LogoutButton from "../../watch/layout/lib/logout-button";

import RefreshPageButton from "./shared/refresh-page-button";

const BadRequestView = async ({ message, status, statusText }: ErrorViewComponentProps) => {
  return (
    <div
      className={
        "w-full flex flex-col items-center justify-center space-y-4 mt-8 text-monokai-bg-contrast"
      }
    >
      <p className={"text-xl"}>
        Error {`${status}`}: {statusText}
      </p>
      <p className={"text-lg"}>{message}</p>
      <div className={"flex flex-col items-center justify-center space-y-2"}>
        <p className={"text-lg"}>Try refreshing the page</p>
        <RefreshPageButton />
        <p className={"text-lg"}>Or</p>
        <LogoutButton />
      </div>
    </div>
  );
};

export default BadRequestView;
