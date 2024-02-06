import Link from 'next/link'
import s from './Footer.module.scss'
import { TwitterIcon } from '../icons/twitter'
import { LinkedinIcon } from '../icons/linkedin'
import { TelegramIcon } from '../icons/telegram'


const socials = [
  {
    icon: <TwitterIcon />,
    link: 'https://twitter.com/home',
  },
  {
    icon: <LinkedinIcon />,
    link: 'https://www.linkedin.com/company/incosmos-work',
  },
  {
    icon: <TelegramIcon />,
    link: 'https://t.me/incosmoswork',
  },
]

export const Footer = () => {

  const date = new Date();
  return (
    <footer className={`${s.footer} container`}>

      <div className={s.footer__text}>
        <p>
          ©incosmos.work, {date.getFullYear()}
        </p>
        <p>
          <span className={s.footer__color_text}>
            Designed by {' '}
          </span>
          <Link target='_blank' href='https://penfell.com/'>
            Penfell
          </Link>
        </p>
      </div>

      <div className={s.footer__text}>
        <p className={s.footer__color_text}>Feel free to reach out:</p>
        <Link className={s.footer__link} href='mailto:info@incosmos.work'>info@incosmos.work</Link>
        <div className={s.footer__socials}>
          {socials.map((link, ind) => {
            return (
              <Link target='_blank' href={link.link} key={ind}>
                {link.icon}
              </Link>
            )
          })}
        </div>
      </div>
    </footer>
  )
}