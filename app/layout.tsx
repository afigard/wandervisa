import "../styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "WanderVisa",
  description: "Visa checker for global travelers",
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
