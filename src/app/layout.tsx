import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Under Cover Game",
  description: "A social deduction game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <main className="min-h-screen ">{children}</main>

        <footer className=" fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm py-4 px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <span>© 2025 Wegle</span>
              <span className="">•</span>
              <span className="">Made with ❤️ in Vietnam</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs bg-white/20 px-2 py-1 rounded">
                v1.0.0
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
