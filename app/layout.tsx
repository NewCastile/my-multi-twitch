import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "My Multi-Twitch",
  description: "Multi-Stream web app build with NextJS Developed by NewCastile",
  openGraph: {
    images: ["/images/muy-multi-twitch.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={GeistSans.className} lang={"en"}>
      <body>
        <main className={"flex min-h-screen flex-col items-center justify-center"}>{children}</main>
      </body>
    </html>
  );
}
