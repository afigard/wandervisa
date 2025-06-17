import "../styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "WanderVisa",
  description: "Visa checker for global travelers",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
