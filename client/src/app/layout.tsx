import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TRUTH | A Journey to the True Church",
  description: "An interactive, narrative-driven logical investigation into Christianity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
