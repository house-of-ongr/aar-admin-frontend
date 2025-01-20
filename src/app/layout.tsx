import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "aar-admin",
  description: "아오옹 소리기록실",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="w-full overflow-auto mx-auto">
        {children}
      </body>
    </html>
  );
}
