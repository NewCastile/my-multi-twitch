import LoginView from "../components/views/login";

const Login = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined | null };
}) => {
  const { message, status } = searchParams;

  return (
    <div className={"flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md"}>
      <LoginView {...{ message, status }} />
    </div>
  );
};

export default Login;
