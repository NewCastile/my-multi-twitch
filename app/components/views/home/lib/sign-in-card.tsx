const SignInCard = async ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  return (
    <div className={"flex w-full flex-col items-center justify-center space-y-8 text-gray-400"}>
      <div className={"flex w-full flex-col items-center justify-center space-y-4"}>
        <h1 className={"w-full text-center text-3xl font-bold text-gray-500"}>
          Hello and welcome to
        </h1>
        <h2 className={"w-max text-center text-5xl font-bold"}>My Multi-Twitch App!</h2>
      </div>
      {children}
    </div>
  );
};

export default SignInCard;
