import { PostJob } from "@/components/postJob/PostJob";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Post a Job",
  metadataBase: new URL('https://cosmos-sandy.vercel.app'),
  openGraph: { images: ['/og.png'] },
};

export default function Create() {
  return (
    <>
      <PostJob />
    </>
  )
}