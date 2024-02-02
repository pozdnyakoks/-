'use client';

import { useState } from 'react';
import s from './Hero.module.scss'
import Image from 'next/image'


export const Hero = () => {
const [isDropdown, setIsDropdown] = useState(false);

  return (
    <section className={`${s.hero} container`}>
      <h1 className={s.hero__title}>Find jobs &talents<br />
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


          <button className={s.select_button} onClick={() => setIsDropdown((prev) => !prev)}  aria-expanded={isDropdown}>
        
            <span className={s.selected_value}>All jobs</span>
            <span className={s.arrow}></span>
          </button>
          <ul className={s.select_dropdown}>
            <li>
              <label>Smart Contract Developer
                <input type="radio" name="job" />
              </label>
            </li>
            <li>
              <label>Software Engineer
                <input type="radio" name="job" />
              </label>
            </li>
            <li>
              <label>Marketing
                <input type="radio" name="job" />
              </label>
            </li>
            <li>
              <label>Community Manager
                <input type="radio" name="job" />
              </label>
            </li>
          </ul>
        </div>

      </div>
    </section >
  )
}