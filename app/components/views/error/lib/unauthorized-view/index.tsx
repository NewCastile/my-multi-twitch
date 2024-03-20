import { ErrorViewComponentProps } from "@/types";

import LogoutButton from "../../../watch/layout/lib/logout-button";
import RefreshPageButton from "../shared/refresh-page-button";

const UnauthorizedView = async ({ message, status, statusText }: ErrorViewComponentProps) => {
  return (
    <div
      className={
        "mt-8 flex w-full flex-col items-center justify-center gap-4 text-monokai-bg-contrast"
      }
    >
      <p className={"text-xl"}>
        Error {`${status}`}: {statusText}
      </p>
      <p className={"text-lg"}>{message}</p>
      <div className={"flex flex-col items-center justify-center gap-2"}>
        <RefreshPageButton />
        <p className={"text-lg"}>Or</p>
        <LogoutButton
          className={"btn-md btn-monokai-black inline-flex gap-2 text-sm font-bold uppercase"}
        >
          logout
        </LogoutButton>
      </div>
    </div>
  );
};

export default UnauthorizedView;
