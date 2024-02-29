export default function DeployButton() {
  return (
    <a
      className={"flex px-3 py-2 no-underline border rounded-md hover:bg-btn-background-hover"}
      href={
        "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This%20starter%20configures%20Supabase%20Auth%20to%20use%20cookies%2C%20making%20the%20user's%20session%20available%20throughout%20the%20entire%20Next.js%20app%20-%20Client%20Components%2C%20Server%20Components%2C%20Route%20Handlers%2C%20Server%20Actions%20and%20Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6"
      }
      rel={"noreferrer"}
      target={"_blank"}
    >
      <svg
        aria-label={"Vercel logomark"}
        className={"w-4 h-4 mr-2"}
        role={"img"}
        viewBox={"0 0 74 64"}
      >
        <path d={"M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"} fill={"currentColor"} />
      </svg>
      Deploy to Vercel
    </a>
  );
}
