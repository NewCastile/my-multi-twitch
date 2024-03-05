import LogoutButton from "../../watch/layout/lib/logout-button";

import RefreshPageButton from "./shared/refresh-page-button";

const SessionExpiredView = async () => {
  return (
    <div
      className={
        "mt-8 flex flex-col items-center justify-center space-y-4 text-monokai-bg-contrast"
      }
    >
      <p className={"text-xl"}>Error: Session expired</p>
      <div className={"flex flex-col items-center justify-center space-y-2"}>
        <RefreshPageButton />
        <p className={"text-lg"}>Or</p>
        <LogoutButton />
      </div>
    </div>
  );
};

export default SessionExpiredView;
