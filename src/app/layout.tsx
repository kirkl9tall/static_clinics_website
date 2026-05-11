import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Praxen Jerumed",
    template: "%s | Praxen Jerumed",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
