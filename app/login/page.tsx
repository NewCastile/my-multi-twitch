import LoginView from "../components/views/login";

const Login = async () => {
  return (
    <div className={"flex flex-col justify-center flex-1 w-full gap-2 px-8 sm:max-w-md"}>
      <LoginView />
    </div>
  );
};

export default Login;
