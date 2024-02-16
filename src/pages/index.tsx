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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Jobs in Cosmos Blockchain</title>
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
        <meta property="og:image:alt" content="Find jobs and talents in Cosmos Blockchain" />
      </Head>
      <Hero />
      <Vacancies />
    </>
  );
}



