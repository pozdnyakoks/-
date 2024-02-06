'use server'

import Airtable, { FieldSet } from "airtable";
import { FollowUs } from "../followUs/FollowUs"
import { VacancyCard } from "./vacancyCard/VacancyCard"




export const VacanciesList = (fetchedJobs: FieldSet[]) => {
  // const data = getData();
  console.log(fetchedJobs)
  return (
    <>
      {/* {
        filtered.slice(0, 2).map((vacancy => (
          <VacancyCard key={vacancy.date} cardInfo={vacancy} />
        )))
      }
      < FollowUs mode='light' />
      {
        filtered.slice(2).map((vacancy => (
          <VacancyCard key={vacancy.date} cardInfo={vacancy} />
        ))) */}
      {/* } */}
    </>
  )
}


