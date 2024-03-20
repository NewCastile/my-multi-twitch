"use client";

import { useRouter } from "next/navigation";

const NotFoundView = () => {
  const router = useRouter();

  return (
    <div className={"flex h-screen w-screen flex-col items-center justify-center text-gray-400"}>
      <p className={"text-5xl font-extrabold text-monokai-bg-contrast"}>Page Not Found</p>
      <span
        className={"text-3xl text-gray-400"}
        role={"link"}
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          router.back();
        }}
      >
        Return to the initial page
      </span>
    </div>
  );
};

export default NotFoundView;
