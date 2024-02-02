import Link from 'next/link'
import s from './Footer.module.scss'
import { TwitterIcon } from '../socialIcons/twitter'
import { LinkedinIcon } from '../socialIcons/linkedin'
import { TelegramIcon } from '../socialIcons/telegram'


const socials = [
  {
    icon: <TwitterIcon />,
    link: '/',
  },
  {
    icon: <LinkedinIcon />,
    link: '/',
  },
  {
    icon: <TelegramIcon />,
    link: '/',
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
          <Link href='/'>
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
              <Link href={link.link} key={ind}>
                {link.icon}
              </Link>
            )
          })}
        </div>
      </div>
    </footer>
  )
}