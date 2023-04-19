import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="navbar">
          <Link href="/">Home</Link>
          <Link href="/list">List</Link>
          <Link href="/cart">Cart</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
