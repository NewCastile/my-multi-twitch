import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";

export default function Header() {
  return (
    <div className={"flex flex-col items-center gap-16"}>
      <div className={"flex items-center justify-center gap-8"}>
        <a
          href={
            "https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          }
          rel={"noreferrer"}
          target={"_blank"}
        >
          <SupabaseLogo />
        </a>
        <span className={"h-6 rotate-45 border-l"} />
        <a href={"https://nextjs.org/"} rel={"noreferrer"} target={"_blank"}>
          <NextLogo />
        </a>
      </div>
      <h1 className={"sr-only"}>Supabase and Next.js Starter Template</h1>
      <p className={"text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center"}>
        The fastest way to build apps with{" "}
        <a
          className={"font-bold hover:underline"}
          href={
            "https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          }
          rel={"noreferrer"}
          target={"_blank"}
        >
          Supabase
        </a>{" "}
        and{" "}
        <a
          className={"font-bold hover:underline"}
          href={"https://nextjs.org/"}
          rel={"noreferrer"}
          target={"_blank"}
        >
          Next.js
        </a>
      </p>
      <div
        className={
          "w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8"
        }
      />
    </div>
  );
}
