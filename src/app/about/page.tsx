import Head from "next/head";
import { About } from "@/components/about/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Incosmos.Work",
  description: "The only job board in Cosmos Blockchain",
  metadataBase: new URL('https://cosmos-sandy.vercel.app'),
  openGraph: { images: ['/og.png'] },
  // icons: {
  //   icon: '/favicon.ico',
  // }
};

export default function AboutPage() {

  return (
    <>
      {/* <Head>
      <meta name="title"
          content="About Incosmos.Work" />
        <meta name="description"
          content="The only job board in Cosmos Blockchain" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>About Incosmos.Work</title>
      </Head> */}
      <About />
    </>
  )
}