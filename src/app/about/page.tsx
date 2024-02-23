import Head from "next/head";
import { About } from "@/components/about/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Incosmos.Work",
  description: "The only job board in Cosmos Blockchain",
  metadataBase: new URL('https://cosmos-sandy.vercel.app'),
  openGraph: { images: ['/og.png'] },
};

export default function AboutPage() {

  return (
    <>
      <About />
    </>
  )
}