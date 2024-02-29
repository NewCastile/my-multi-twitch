import NextLink from "next/link";

const NotFoundView = () => {
  return (
    <div className={"flex h-screen w-screen flex-col items-center justify-center text-gray-400"}>
      <p className={"text-5xl font-extrabold text-monokai-bg-contrast"}>Page Not Found</p>
      <NextLink className={"text-3xl text-gray-400"} href={"/"}>
        Return to the initial page
      </NextLink>
    </div>
  );
};

export default NotFoundView;
