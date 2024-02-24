'use client'

import { useEffect, useState } from "react";
import Image from "next/image"
import Link from "next/link"
import { useGetWindowDimensions } from "@/utils/use-get-window-dimensions";
import { mobile } from "@/utils/constants";
import { useScrollbarWidth } from "@/utils/scrollbar";
import s from './Header.module.scss';

export const Header = () => {
  const [isShow, setIsShow] = useState(false);
  const { width } = useGetWindowDimensions();
  const isMobile = width < mobile;
  const scroll = useScrollbarWidth();

  useEffect(() => {
    document.body.style.overflow = isShow ? 'hidden' : '';
    document.body.style.width = !isShow ? `calc(100% - ${scroll}px)` : '100%';
    document.body.style.position = isShow ? 'fixed' : 'relative'

  }, [isShow])

  const closeMenu = () => {
    setIsShow(false);
  }

  return (
    <header className={`${s.header} container`}>
      <Link href='/'>
        <Image
          src='/Logo.svg'
          height={isMobile ? '16' : '24'}
          width={isMobile ? '146' : '219'}
          alt='logo'
        />
      </Link>
      {!isMobile &&
        <nav>
          <ul className={s.header__list}>
            <li><Link className={s.header__link} href='/'>Jobs</Link></li>
            <li><Link className={s.header__link} href='/about'>About</Link></li>
            <li><Link className={`${s.header__link} ${s.header__link_last}`} href='/create'>Post a Job</Link></li>
          </ul>
        </nav>
      }
      {isMobile &&
        <button onClick={() => setIsShow(prev => !prev)} className={`${s.header__burger_btn} ${isShow && s.active} `}>
          <span className={s.header__burger_btn_line}></span>
          <span className={s.header__burger_btn_line}></span>
        </button>
      }
      {isMobile && <div className={`${s.header__burger_menu} ${isShow && s.active}`}>
        <ul className={s.header__list}>
          <li><Link onClick={closeMenu} className={s.header__link} href='/'>Jobs</Link></li>
          <li><Link onClick={closeMenu} className={s.header__link} href='/about'>About</Link></li>
          <li><Link onClick={closeMenu} className={`${s.header__link} ${s.header__link_last}`} href='/create'>Post a Job</Link></li>
        </ul>
      </div>}
    </header>
  )
}