import { NextResponse } from "next/server";

import { INITIAL_PAGE_ROUTE } from "@/constants";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  try {
    const requestUrl = new URL(request.url);

    const code = requestUrl.searchParams.get("code");
    const origin = requestUrl.origin;

    if (code) {
      const supabase = createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        return NextResponse.redirect(`${origin}/login`);
      }
    } else {
      return NextResponse.redirect(`${origin}/login`);
    }

    // URL to redirect to after sign up process completes
    return NextResponse.redirect(`${origin}/${INITIAL_PAGE_ROUTE}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    if (error instanceof Error && "status" in error) {
      const requestUrl = new URL(request.url);

      const origin = requestUrl.origin;

      if (error.status === 429) {
        return NextResponse.redirect(
          `${origin}/login?message=${error.message}&status=${error.status}&name=${error.name}`,
        );
      }

      return NextResponse.redirect(
        `${origin}/login?message=${encodeURI(
          "Something went wrong while login you in",
        )}&status=${400}&name=${encodeURI("Unkwown OAuth Error")}`,
      );
    }
  }
}
