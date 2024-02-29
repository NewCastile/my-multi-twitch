import LogoutButton from "./logout-button";

const Header = () => {
  return (
    <div
      className={
        "flex w-full flex-row items-center justify-between border-t-8 border-t-monokai-orange bg-monokai-bg-contrast px-5 py-3"
      }
    >
      <div>
        <p className={"font-mono text-3xl font-black uppercase text-monokai-white"}>
          My Multi-Twitch
        </p>
      </div>
      <LogoutButton />
    </div>
  );
};

export default Header;
