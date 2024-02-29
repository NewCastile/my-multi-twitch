const SignInCard = async ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  return (
    <div
      className={
        "flex min-h-screen flex-col items-center w-full justify-center space-y-8 text-gray-400"
      }
    >
      <div className={"flex flex-col items-center justify-center w-full space-y-4"}>
        <h1 className={"w-full text-center text-3xl text-gray-500 font-bold"}>
          Hello and welcome to
        </h1>
        <h2 className={"w-max text-5xl font-bold text-center"}>My Multi-Twitch App!</h2>
      </div>
      <form className={"flex flex-col justify-center items-center w-full"}>{children}</form>
    </div>
  );
};

export default SignInCard;
