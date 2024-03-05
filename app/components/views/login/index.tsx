import SignInForm from "./lib/sign-in-form";

const LoginView = async ({
  message,
  status,
}: {
  message?: string | null;
  status?: string | null;
}) => {
  return (
    <div className={"flex flex-col items-center justify-center space-y-2"}>
      <SignInForm {...{ message, status }} />
    </div>
  );
};

export default LoginView;
