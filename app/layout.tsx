import "../styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "WanderVisa – Fast & Simple Visa Checker for Travelers",
  description:
    "Instantly check visa requirements between countries. Built for digital nomads, backpackers, and global travelers. Free and fast.",
  keywords: [
    "visa checker",
    "travel visa",
    "visa requirements",
    "digital nomad",
    "remote work travel",
    "travel planning",
    "WanderVisa",
  ],
  authors: [{ name: "Adrien Figard" }],
  creator: "Adrien Figard",
  openGraph: {
    title: "WanderVisa – Fast Visa Checker for Travelers",
    description:
      "Find visa rules between countries in seconds. WanderVisa is your no-fuss travel tool.",
    url: "https://wandervisa.vercel.app/",
    siteName: "WanderVisa",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 flex flex-col min-h-screen">
        <div className="flex-grow">{children}</div>
        <footer className="flex justify-between items-center text-sm text-gray-700 py-4 px-10">
          <span>© {new Date().getFullYear()} WanderVisa</span>
          <span>All rights reserved.</span>
        </footer>
      </body>
    </html>
  );
}
