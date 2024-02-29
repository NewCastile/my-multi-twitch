/* eslint-disable no-console */
"use client"; // Error components must be Client Components

import UnexpectedError from "./components/views/error/lib/unexpected-error";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <UnexpectedError {...{ error, reset }} />;
}
