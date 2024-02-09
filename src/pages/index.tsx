'use client'

import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { Hero } from "@/components/hero/Hero";
import { Vacancies } from "@/components/vacancies/Vacancies";
import { setTags } from "@/lib/slices/tagsSlice";
import { setJobs } from "@/lib/slices/jobsSlice";
import { TJob } from "@/lib/types";
import { useEffect } from "react";

type Props = {
  customData: {
    records: TJob[];
    tags: string[]
  }
}

export default function Home({ customData }: Props) {

  const jobsArray = useSelector(
    (state: RootState) => state.jobs.jobs
  );
  // console.log(customData)

  const dispatch = useDispatch();
  useEffect(() => {
    if (jobsArray.length === 0) {
      dispatch(setTags(customData.tags));
      dispatch(setJobs(customData.records))
    }
  }, [customData])


  return (
    <>
      <Hero />
      <Vacancies />
    </>
  );
}



