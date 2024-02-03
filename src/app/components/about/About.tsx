import Link from 'next/link';
import s from './About.module.scss';
import { FollowUs } from '../followUs/FollowUs';

export const About = () => {
  return (
    <section className={`${s.about} container`}>
      <p className={s.about__subtitle}>About Us</p>
      <h2 className={s.about__title}>Connecting Cosmos Talents & Opportunities</h2>

      <p className={s.about__desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu gravida ex. Donec interdum sem sit amet arcu pellentesque, ac molestie dolor volutpat. Praesent leo ex, pretium ac fermentum vel, blandit et ipsum. Integer non sagittis odio. Integer eu quam scelerisque, eleifend massa eget, ornare felis. In dapibus metus sapien, non tempus diam luctus ac. Praesent id porta nulla. In id nisl sit amet justo iaculis malesuada et ac elit. Pellentesque sed elit id felis sodales lobortis. In tincidunt augue nibh. Praesent consectetur quam vitae volutpat ornare. Ut vulputate tellus et dui cursus, vitae commodo lectus sollicitudin. Nullam aliquet eget neque a sodales. Donec lacus lorem, iaculis in mauris ut, facilisis molestie nunc. Nam scelerisque lectus nec nisi bibendum, ut volutpat lectus tincidunt.
      </p>
      <p className={s.about__desc}>
        Mauris quis lectus vitae diam pulvinar maximus. Ut lorem magna, aliquet non arcu sit amet, gravida lobortis nunc. Aliquam mattis magna a aliquam congue. Nulla imperdiet neque vel placerat hendrerit. Vivamus volutpat massa nec mauris pellentesque, in pretium neque viverra. Praesent consectetur at neque pharetra congue. In vel vulputate turpis. Curabitur ac urna porta purus ultricies mattis in a nulla.
      </p>

      <h3 className={s.about__title_small}>Contact Us</h3>

      <p className={s.about__contact}>
        Email: <Link href='mailto:info@incosmos.work'>info@incosmos.work</Link>
      </p>
      <p className={s.about__contact}>
        Telegram: <Link href=' https://t.me/incosmoswork'>https://t.me/incosmoswork</Link>
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