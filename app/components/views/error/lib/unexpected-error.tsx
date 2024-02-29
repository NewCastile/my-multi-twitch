/* eslint-disable no-console */
"use client";
import { useEffect } from "react";

import { UnexpectedErrorProps } from "@/types";

const UnexpectedError = ({ error, reset }: UnexpectedErrorProps) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div
      className={
        "w-full flex flex-col items-center justify-center space-y-2 mt-8 text-monokai-bg-contrast"
      }
    >
      <h2 className={"text-xl"}>Something went wrong!</h2>
      <p className={"text-lg"}>{error.message}</p>
      <button className={"btn-md btn-monokai-green"} onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
};

export default UnexpectedError;
