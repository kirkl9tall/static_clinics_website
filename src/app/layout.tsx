import type { Metadata } from "next";
import "./globals.css";

// Only the non-localised redirect stubs resolve their title here; every real
// page sits under [locale], whose layout owns the "%s | Praxen Jerumed" template.
export const metadata: Metadata = {
  title: "Praxen Jerumed",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
