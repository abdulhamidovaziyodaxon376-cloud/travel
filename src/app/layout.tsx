import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shoreline Hotel | Rooms & Retreat",
  description: "Find your own kind of stillness at Shoreline Hotel, Miami.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}