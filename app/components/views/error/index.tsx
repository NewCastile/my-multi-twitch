import { ERRORS_STATUSES } from "@/constants";
import { ApiErrorResponse, ErrorViewEntrie } from "@/types";

import DefaultView from "./lib/default-view";
import UnauthorizedView from "./lib/unauthorized-view";

const ErrorView = async ({ message, status, statusText }: ApiErrorResponse) => {
  const [filteredView] = ErrorViews.filter((view) => {
    return view.statusText === statusText;
  });

  return <CurrentView error={{ message, status, statusText }} matchingView={filteredView} />;
};

const CurrentView = async ({
  matchingView,
  error,
}: {
  matchingView: ErrorViewEntrie | undefined | null;
  error: ApiErrorResponse;
}) => {
  const { message, status } = error;

  if (matchingView) {
    const { component: ErrorComponent, statusText } = matchingView;

    return <ErrorComponent {...{ message, status, statusText }} />;
  } else {
    return <DefaultView {...error} />;
  }
};

const ErrorViews: ErrorViewEntrie[] = ERRORS_STATUSES.map((statusEntrie) => {
  const { statusText } = statusEntrie;

  switch (statusText) {
    case "Unauthorized":
      return { statusText, component: UnauthorizedView };
    default:
      return { statusText, component: DefaultView };
  }
});

export default ErrorView;
