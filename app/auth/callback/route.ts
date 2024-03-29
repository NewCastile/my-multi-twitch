"use server";

import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");

  try {
    if (code) {
      const supabase = createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        return NextResponse.redirect(`${origin}/`);
      } else {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data: profiles } = await supabase.from("profiles").select("*").eq("id", user?.id);

        if (!profiles) {
          throw new Error("Profile Not Found");
        } else {
          const [profile] = profiles;

          if (!profile) {
            throw new Error("No profile was found");
          } else {
            const { last_visited } = profile;

            return NextResponse.redirect(
              last_visited ? `${origin}${last_visited}` : `${origin}/watch`,
            );
          }
        }
      }
    } else {
      return NextResponse.redirect(`${origin}/`);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    const loginPageErrorParams = `message=${encodeURI(
      "Something went wrong while login you in",
    )}&status=${400}&name=${encodeURI("Unkwown OAuth Error")}`;

    if (error instanceof Error && "status" in error) {
      const requestUrl = new URL(request.url);

      const origin = requestUrl.origin;

      if (error.status === 429) {
        return NextResponse.redirect(
          `${origin}/?message=${error.message}&status=${error.status}&name=${error.name}`,
        );
      } else {
        return NextResponse.redirect(`${origin}/?${loginPageErrorParams}`);
      }
    } else {
      return NextResponse.redirect(`${origin}/?${loginPageErrorParams}`);
    }
  }
}
