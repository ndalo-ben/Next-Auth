import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./provider/provider";
import Appbar from "./components/Appbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const metadata: Metadata = {
  title: "Next Authentication",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <Appbar />
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
