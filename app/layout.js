'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Provider } from "react-redux";
import { store } from "../app/redux/store";
import PrecioTotal from "../components/ui/precioTotal";
import NavBar from "../components/ui/nav/navbar";
import Footer from "../components/ui/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Provider store={store}>
          <PrecioTotal />
          <NavBar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
