import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import StoreProvider from "./StoreProvider";
import GoogleAnalytics from "@/components/googleAnalytics";
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
        <GoogleAnalytics ga_id="G-RMJ8YFQP66"  />
        <form name='postJob'
          data-netlify="true"
          netlify-honeypot="bot-field" hidden>
          <input type="text" name="Company" />
          <input type="text" name="Website" />
          <input type="email" name="Email" />
          <textarea name="Details"></textarea>
          <input type="text" name="Location" />
          <input type="text" name="Salary" />
          <input type="text" name="Link" />
        </form>
        <Header />
        <StoreProvider>{children}</StoreProvider>
        <Footer />
      </body>
    </html>
  );
}
