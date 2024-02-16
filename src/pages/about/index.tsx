import { About } from "@/components/about/About";
import Head from "next/head";

export default function AboutPage() {

  return (
    <>
      <Head>
        <meta name="description"
          content="The only job board in Cosmos Blockchain" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>About Incosmos.Work</title>
      </Head>
      <About />
    </>
  )
}