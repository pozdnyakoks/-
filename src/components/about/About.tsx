import Link from 'next/link';
import { FollowUs } from '../followUs/FollowUs';
import s from './About.module.scss';

export const About = () => {
  return (
    <section className={`${s.about} container`}>
      <p className={s.about__subtitle}>About Us</p>
      <h2 className={s.about__title}>Connecting Cosmos Talents & Opportunities</h2>

      <p className={s.about__desc}>
        InCosmos is a job board that strives to become a single source of truth for all the great job opportunities in the Cosmos Blockchain Ecosystem or projects that are considered as cosmos blockchains or use the core tech that was developed within the ecosystem like Cosmos SDK. </p>
      <p className={s.about__desc}>
        Feel free to contact us if you need help or an advice on how to find talents or jobs in the ecosystem.
      </p>

      <h3 className={s.about__title_small}>Contact Us</h3>

      <p className={s.about__contact}>
        Email: <Link href='mailto:info@incosmos.work'>info@incosmos.work</Link>
      </p>
      <p className={s.about__contact}>
        Telegram: <Link href='https://t.me/incosmoswork'>https://t.me/incosmoswork</Link>
      </p>
      <p className={s.about__contact}>
        Twitter: <Link href='https://twitter.com/incosmoswork'>https://twitter.com/incosmoswork</Link>
      </p>
      <div className={s.about__follow}>
        <FollowUs mode='dark' />

      </div>
    </section>
  )
}