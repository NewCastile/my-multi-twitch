import { SignInButton } from "./sign-in-button";
import SignInCard from "./sign-in-card";

const SignInForm = async ({
  message,
  status,
}: {
  message?: string | null;
  status?: string | null;
}) => {
  return (
    <SignInCard>
      <SignInButton />
      {status && message && (
        <div className={"flex flex-col items-center justify-center"}>
          <p>Error: {status}</p>
          <p>{message}</p>
          <p>Please try again later</p>
        </div>
      )}
    </SignInCard>
  );
};

export default SignInForm;
