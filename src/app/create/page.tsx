import { Metadata } from "next";
import { PostJob } from "@/components/postJob/PostJob";


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