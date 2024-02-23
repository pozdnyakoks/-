import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import StoreProvider from "./StoreProvider";
import "@/styles/globals.scss";
const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://cosmos-sandy.vercel.app'),
  title: "Jobs in Cosmos Blockchain",
  description: "Find jobs and talents in Cosmos Blockchain",
  openGraph: { images: ['/og.png'] },
  icons: {
    icon: '/icon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={urbanist.className}>
        <Header />
          <StoreProvider>{children}</StoreProvider>
        <Footer />
      </body>
    </html>
  );
}
