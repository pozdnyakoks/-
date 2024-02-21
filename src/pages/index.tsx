'use client'

import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { Hero } from "@/components/hero/Hero";
import { Vacancies } from "@/components/vacancies/Vacancies";
import { setTags } from "@/lib/slices/tagsSlice";
import { setJobs } from "@/lib/slices/jobsSlice";
import { TJob } from "@/lib/types";
import { useEffect } from "react";
import { setIsFetched } from "@/lib/slices/isFetchedSlice";
import { setIsError } from "@/lib/slices/isErrorSlice";
import Head from "next/head";

type Props = {
  customData: {
    records: TJob[];
    tags: string[];
    isFetched: boolean;
    isError: boolean;
  }
}

export default function Home({ customData }: Props) {

  const jobsArray = useSelector(
    (state: RootState) => state.jobs.jobs
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (jobsArray.length === 0) {
      dispatch(setTags(customData.tags));
      dispatch(setJobs(customData.records))
      dispatch(setIsFetched(customData.isFetched))
      dispatch(setIsError(customData.isError))
    }
  }, [customData])


  return (
    <>
      <Head>
        <meta name="description"
          content="Find jobs and talents in Cosmos Blockchain" />
        <meta name="title"
          content="Jobs in Cosmos Blockchain" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Jobs in Cosmos Blockchain</title>
        <meta property="og:url" content="https://cosmos-sandy.vercel.app/" />
        <meta property="og:title" content="Jobs in Cosmos Blockchain" />
        <meta property="og:description" content="Find jobs and talents in Cosmos Blockchain" />
        <meta property="og:image" content="https://cosmos-sandy.vercel.app/og.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="https://cosmos-sandy.vercel.app/" />
        <meta property="twitter:url" content="https://cosmos-sandy.vercel.app/" />
        <meta name="twitter:title" content="Jobs in Cosmos Blockchain" />
        <meta name="twitter:description" content="Find jobs and talents in Cosmos Blockchain" />
        <meta name="twitter:image" content="" />
      </Head>
      <Hero />
      <Vacancies />
    </>
  );
}



