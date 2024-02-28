'use client'

import { useState } from 'react';
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import breaks from 'remark-breaks';
import { TJob } from '@/lib/types';
import { useGetWindowDimensions } from '@/utils/use-get-window-dimensions';
import { mobile } from '@/utils/constants';
import { FollowUs } from '../followUs/FollowUs';
import { Dollar } from '../icons/dollar';
import { Door } from '../icons/door';
import { Location } from '../icons/location';
import { Tick } from '../icons/tick';
import s from './Developer.module.scss';
import Link from 'next/link';


export const Developer = ({ job }: { job: TJob | null }) => {

  const [details] = useState<undefined | string>(job?.fields.Details)
  const { width } = useGetWindowDimensions();
  const isMobile = width < mobile

  const replaceCode = (code: string) => {
    return code.replaceAll('    ', '')
  }

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


            {job.fields['Salary Short'] && !isMobile && <div className={s.developer__grid_cell}>
              <Dollar />
              <span>{job.fields['Salary Short']} / year</span>
            </div>
            }

            {job.fields.Status === 'Closed' && <div className={`${s.developer__grid_cell} ${s.developer__grid_cell_closed} ${!job.fields['Salary Short'] && s.developer__grid_cell_full}`}>
              <Tick />
              <span>{job.fields.Status}</span>
            </div>}

            {job.fields.Status !== 'Closed' &&
              <div className={s.developer__grid_open}>
                <div className={`${s.developer__grid_cell} ${s.developer__grid_cell_open} ${!job.fields['Salary Short'] && s.developer__grid_cell_full}`}>
                  <Tick />
                  <span>Open</span>
                </div>
                {job.fields['Salary Short'] && <a href={job?.fields['Apply Link']} target='_blank' className={s.developer__grid_cell_btn}>Apply</a>}
              </div>
            }

            {!job.fields['Salary Short'] && job.fields.Status !== 'Closed' &&
              <a href={job?.fields['Apply Link']} target='_blank' className={s.developer__grid_cell_btn}>Apply</a>
            }

          </div>

          <h3 className={s.developer__subtitle}>About</h3>
          <div className={s.developer__desc}>
            <Markdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[breaks]}
            >
              {replaceCode(details || '')}
              {/* {details} */}
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