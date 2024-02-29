import Link from "next/link";

import GithubIcon from "@/app/components/icons/github-icon";

const Footer = () => {
  return (
    <div className={"py-4 px2 "}>
      <p className={"text-center font-bold text-2xl text-monokai-bg-contrast"}>
        Made by{" "}
        <Link
          className={"flex flex-row items-center justify-center space-x-2"}
          href={"https://github.com/NewCastile"}
        >
          <span>NewCastile</span>
          <span className={"inline-block align-top"}>
            <GithubIcon />
          </span>
        </Link>
      </p>
    </div>
  );
};

export default Footer;
