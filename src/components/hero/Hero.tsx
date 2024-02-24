'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Image from 'next/image'
import { useGetWindowDimensions } from '@/utils/use-get-window-dimensions';
import { mobile } from '@/utils/constants';
import { RootState } from '@/lib/store';
import { TJob } from '@/lib/types';
import { setTags } from '@/lib/slices/tagsSlice';
import { setIsFetched } from '@/lib/slices/isFetchedSlice';
import { setIsError } from '@/lib/slices/isErrorSlice';
import { setJobs } from '@/lib/slices/jobsSlice';
import { getVacancies } from '@/app/api/getVacancies';
import s from './Hero.module.scss'

export const Hero = () => {

  const pathname = usePathname();
  const searchParams = useSearchParams()
  const router = useRouter();
  const jobsListState = useSelector(
    (state: RootState) => state.tags.tags
  );

  const [isDropdown, setIsDropdown] = useState(false);
  const [isDropdownMobile, setIsDropdownMobile] = useState(false);
  const [mobileInputValue, setMobileInputValue] = useState('');
  const [jobsCur, setJobsCur] = useState(jobsListState)
  // const [height, setHeight] = useState(0);
  const { width } = useGetWindowDimensions()

  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = width < mobile;

  const [currentTag, setCurrentTag] = useState(searchParams.get('tag') === null ? '' : searchParams.get('tag'))

  useEffect(() => {
    setJobsCur(jobsListState)
  }, [jobsListState])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdown(false);
      }
    };

    if (isDropdown) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdown]);

  useEffect(() => {
    if (searchParams.get('tag') !== '' && typeof searchParams.get('tag') !== 'object' && searchParams.get('tag') !== null) {
      setCurrentTag(searchParams.get('tag'))
    } else {
      setCurrentTag('')
    }
  }, [searchParams])

  const changeJob = (value: string) => {
    if (value !== '') {
      router.push(pathname + '?' + 'page=1' + '&' + 'tag=' + value,)
    } else {
      router.push(pathname + '?' + 'page=' + (searchParams.get('page') || '1'))
    }
  }

  const mobileInputHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    setMobileInputValue(ev.target.value);
    const filtered = jobsListState.filter
      (job => job.toLowerCase().startsWith(ev.target.value.toLowerCase()))
    setJobsCur(filtered);

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


  useEffect(() => {
    if (isDropdownMobile) {
      // document.body.style.overflow = 'hidden'
      // document.body.style.position = 'fixed'
      document.body.classList.add('hidden')

    } else {
      document.body.classList.remove('hidden')

      // document.body.style.overflow = ''
      // document.body.style.position = 'relative'

    }
  }, [isDropdownMobile])

  const [viewportHeight, setViewportHeight] = useState<undefined | number>(undefined);
  useEffect(() => {
    if (/iPhone|iPad|iPod/.test(window.navigator.userAgent)) {
      const handleResize = () => {
        if (window.visualViewport?.height !== null && window.visualViewport?.height !== undefined) {
          setViewportHeight(window.visualViewport.height);
        }
      }
      window.visualViewport?.addEventListener('resize', handleResize);
      handleResize();
      return () => window.visualViewport?.removeEventListener('resize', handleResize);
    }
  }, []);
  // return viewportHeight;




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
        <div ref={dropdownRef} className={`${s.hero__custom_select} ${isDropdown && s.active}`}>
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
              {jobsListState.map(job => (
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

      {isMobile && <div className={`${s.hero__dropdown_mobile} ${isDropdownMobile && s.active}`}
        style={{ height: viewportHeight || '100%' }}
      >
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
          {jobsCur.map(job => (
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