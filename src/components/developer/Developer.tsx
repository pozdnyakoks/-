import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import breaks from 'remark-breaks';
import { TJob } from '@/lib/types';
import { FollowUs } from '../followUs/FollowUs';
import { Dollar } from '../icons/dollar';
import { Door } from '../icons/door';
import { Location } from '../icons/location';
import { Tick } from '../icons/tick';
import s from './Developer.module.scss';

import { useState, useEffect } from 'react';

export const Developer = ({ job }: { job: TJob | null }) => {
  // console.log(job?.fields.Details)

  const [details, setDetails] = useState<undefined | string>(job?.fields.Details)

  useEffect(() => {
    const replaced = job?.fields.Details.replaceAll(' **', '**').replaceAll('** ', '**');
    setDetails(replaced)
  }, [job?.fields.Details])

  return (

    <section className={`${s.developer} container`}>
      {job?.fields &&
        <>
          <h2 className={s.developer__title}>{job.fields['Job Title']}</h2>

          <div className={s.developer__grid}>
            <div className={s.developer__grid_cell}>
              <Door />
              <span>{job.fields.Company}</span>
            </div>


            <div className={s.developer__grid_cell}>
              <Location />
              <span>{job.fields.Location}</span>
            </div>


            {<div className={s.developer__grid_cell}>
              <Dollar />
              <span>{job.fields['Salary Short'] ? `${job.fields['Salary Short']} / year` : '-'}</span>

            </div>
            }

            {job.fields.Status === 'Closed' && <div className={`${s.developer__grid_cell} ${s.developer__grid_cell_closed}`}>
              <Tick />
              <span>{job.fields.Status}</span>
            </div>}

            {job.fields.Status !== 'Closed' &&
              <div className={s.developer__grid_open}>
                <div className={`${s.developer__grid_cell} ${s.developer__grid_cell_open}`}>
                  <Tick />
                  <span>Open</span>
                </div>
                <button className={s.developer__grid_cell_btn}>Apply</button>
              </div>
            }

          </div>

          <h3 className={s.developer__subtitle}>About</h3>
          <div className={s.developer__desc}>
            <Markdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[breaks]}
            >
              {details}
            </Markdown>
          </div>
        </>
      }

      <a href={job?.fields['Apply Link']} target='_blank' className={s.developer__btn}>Apply</a>

      <div className={s.developer__follow}>
        <FollowUs mode='dark' />
      </div>

    </section >
  )
}