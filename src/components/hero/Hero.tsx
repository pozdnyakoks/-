'use client';

import { ChangeEvent, useState } from 'react';
import s from './Hero.module.scss'
import Image from 'next/image'
import { useGetWindowDimensions } from '../../utils/use-get-window-dimensions';
import { mobile } from '../../utils/constants';
import { jobsList } from '@/mock/jobsList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { setJob } from '@/lib/slices/jobSlice';

export const Hero = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [isDropdownMobile, setIsDropdownMobile] = useState(false);
  const [mobileInputValue, setMobileInputValue] = useState('');
  const [jobs, setJobs] = useState(jobsList)
  const { width } = useGetWindowDimensions()
  const isMobile = width < mobile;
  const dispatch = useDispatch();
  const currentJob = useSelector(
    (state: RootState) => state.job.job
  );

  const changeJob = (value: string) => {
    dispatch(setJob(value));
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
            <span className={s.selected_value}>{currentJob === '' ? 'All Jobs' : currentJob}</span>
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
        <li className={s.hero__dropdown_mobile_item} key='all'>
              <button
                onClick={() => jobHandler('')}
              >All jobs</button>
            </li>
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