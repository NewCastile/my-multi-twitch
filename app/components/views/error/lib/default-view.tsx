import { ErrorViewComponentProps } from "@/types";

import LogoutButton from "../../watch/layout/lib/logout-button";

const DefaultView = async ({ message, status, statusText, children }: ErrorViewComponentProps) => {
  return (
    <div
      className={
        "mt-8 flex flex-col items-center justify-center space-y-4 text-monokai-bg-contrast"
      }
    >
      <p className={"text-xl"}>
        Error{` ${status}`}: {statusText}
      </p>
      <p className={"text-lg"}>{message ?? "Sorry... something went wrong :'c"}</p>
      <LogoutButton />
      {children}
    </div>
  );
};

export default DefaultView;
