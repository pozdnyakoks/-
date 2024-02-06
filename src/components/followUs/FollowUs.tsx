import Image from 'next/image';
import s from './FollowUs.module.scss';
import Link from 'next/link';

export const FollowUs = ({ mode }: { mode: 'dark' | 'light' }) => {
  return (
    <div className={`${s.follow} ${mode === 'dark' && s.dark}`}>
      <div className={s.follow__block}>
        <p className={s.follow__desc}>
          Follow us to not miss out on exciting Cosmos opportunities and hiring news
        </p>
        <div className={s.follow__socials}>
          <Link target='_blank' href='https://twitter.com/home'>
            <Image src='/twitter.svg' alt='twitter' width='56' height='56' />
          </Link>
          <Link target='_blank' href='https://www.linkedin.com/company/incosmos-work'>
            <Image src='/linkedIn.svg' alt='linkedIn' width='56' height='56' />
          </Link>
        </div>
      </div>
    </div>
  )
}