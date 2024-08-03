import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css'
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fan Meet",
  description: "Video Meeting Website",
  icons: "/favicon.ico",
};

export default function RootLayout({  children,}: Readonly<{  children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <ClerkProvider appearance={{layout: { logoImageUrl: '/images/Logo1.png', socialButtonsVariant: 'iconButton', }, variables: { colorPrimary: '#21f1fc' } }}>
        <body className={`${inter.className} dark:bg-dark-2`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
