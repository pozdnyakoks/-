import { PostJob } from "@/components/postJob/PostJob";
import Head from "next/head";

export default function Create() {
  return (
    <>
      <Head>
        <title>Post a Job</title>
      </Head>
      <PostJob />
    </>
  )
}