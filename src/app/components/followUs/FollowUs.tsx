import Image from 'next/image';
import s from './FollowUs.module.scss';

export const FollowUs = ({mode}: {mode: 'dark' | 'light'}) => {
  return (
    <div className={`${s.follow} ${mode === 'dark' && 'dark'}`}>
      <p className={s.follow__desc}>
        Follow us to not miss out on exciting Cosmos opportunities and hiring news
      </p>
      <div className={s.follow__socials}>
        <a href='/'>
          <Image src='/twitter.svg' alt='twitter' width='56' height='56' />
        </a>
        <a href='/'>
          <Image src='/linkedIn.svg' alt='linkedIn' width='56' height='56' />
        </a>
      </div>
    </div>
  )
}