'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {  useSelector } from 'react-redux';
import Image from 'next/image'
import { useGetWindowDimensions } from '../../utils/use-get-window-dimensions';
import { mobile } from '../../utils/constants';
import { RootState } from '@/lib/store';
import s from './Hero.module.scss'

export const Hero = () => {
  const router = useRouter()
  const jobsList = useSelector(
    (state: RootState) => state.tags.tags
  );
  const [isDropdown, setIsDropdown] = useState(false);
  const [isDropdownMobile, setIsDropdownMobile] = useState(false);
  const [mobileInputValue, setMobileInputValue] = useState('');
  const [jobs, setJobs] = useState(jobsList)
  const { width } = useGetWindowDimensions()
  const isMobile = width < mobile;


  const jobsArray = useSelector(
    (state: RootState) => state.jobs.jobs
  );

  const [currentTag, setCurrentTag] = useState(router.query.tag === undefined ? '' : router.query.tag)

  useEffect(() => {
    if (router.query.tag !== '' && typeof router.query.tag !== 'object' && router.query.tag !== undefined) {
      setCurrentTag(router.query.tag)
    } else {
      setCurrentTag('')
    }
  }, [router.query])

  const changeJob = (value: string) => {
    const { pathname, query } = router;

    if (value !== '') {
      router.push({
        pathname,
        query: { page: '1', tag: value }
      });
    } else {
      delete query.tag;
      router.push({ pathname, query }, undefined, { shallow: true });
    }
  }

  const mobileInputHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    setMobileInputValue(ev.target.value);
    const filtered = jobsList.filter
      (job => job.toLowerCase().includes(ev.target.value.toLowerCase()))
    setJobs(filtered);
  }

  const dropdownHandler = () => {
    if (isMobile) {
      setIsDropdownMobile((prev => !prev))
    } else {
      setIsDropdown((prev) => !prev)
    }
  }

  const jobHandler = (job: string) => {
    changeJob(job);
    if (isMobile) {
      setIsDropdownMobile(false)
    } else {
      setIsDropdown(false)
    }
  }

  return (
    <section className={`${s.hero} container`}>
      <h1 className={s.hero__title}>Find jobs & talents<br />
        in the Cosmos blockchain</h1>
      <p className={s.hero__desc}>or at companies that use Cosmos SDK, CosmWasm, Ignite CLI
        and other tech related to the blockchain.</p>

      <div className={s.hero__block}>
        <span className={s.hero__block_hashtag}>
          <Image
            src='/hashtag.svg'
            alt='hashtag'
            width='15'
            height='15'
          />
        </span>
        <div className={`${s.hero__custom_select} ${isDropdown && s.active}`}>
          <button className={s.select_button} onClick={dropdownHandler} aria-expanded={isDropdown}>
            <span className={s.selected_value}>{currentTag === '' ? 'All Jobs' : currentTag}</span>
            <span className={s.arrow}></span>
          </button>
          {!isMobile &&
            <ul className={s.select_dropdown}>
              <li key='all' onClick={() => jobHandler('')}>
                <label>All jobs
                  <input type="radio" value='' name="job" />
                </label>
              </li>
              {jobsList.map(job => (
                <li key={job} onClick={() => jobHandler(job)}>
                  <label>{job}
                    <input type="radio" value={job} name="job" />
                  </label>
                </li>
              ))}
            </ul>
          }
        </div>
      </div>

      {isMobile && <div className={`${s.hero__dropdown_mobile} ${isDropdownMobile && s.active}`}>
        <div className={s.hero__dropdown_mobile_block}>
          <button className={s.hero__dropdown_mobile_block_btn}
            onClick={() => setIsDropdownMobile(false)}
          >
            <Image
              alt='close'
              width='40'
              height='40'
              src='/arrow.svg' />
          </button>
          <input
            type='text'
            className={s.hero__dropdown_mobile_block_input}
            placeholder='Enter text'
            value={mobileInputValue}
            onChange={mobileInputHandler}
          />
        </div>

        <ul>
          {mobileInputValue === '' && <li className={s.hero__dropdown_mobile_item} key='all'>
            <button
              onClick={() => jobHandler('')}
            >All jobs</button>
          </li>}
          {jobs.map(job => (
            <li className={s.hero__dropdown_mobile_item} key={job}>
              <button
                onClick={() => jobHandler(job)}
              >{job}</button>
            </li>
          ))}
        </ul>
      </div>}
    </section >
  )
}