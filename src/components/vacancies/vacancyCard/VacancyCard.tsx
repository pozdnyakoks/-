
import s from './VacancyCard.module.scss';
import { Door } from '../../icons/door';
import { Location } from '../../icons/location';
import { setJob } from '@/lib/slices/jobSlice';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { TJob } from '@/lib/types';


export const VacancyCard = ({ cardInfo }: { cardInfo: TJob }) => {

  const makeDate = (date: string) => {
    const newDate = new Date(date).getTime();
    const now = new Date().getTime();
    const diff = now - newDate;

    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute = millisecondsPerSecond * 60;
    const millisecondsPerHour = millisecondsPerMinute * 60;
    const millisecondsPerDay = millisecondsPerHour * 24;
  
    // Вычисляем количество дней, часов, минут и секунд
    const days = Math.floor(diff / millisecondsPerDay);
    const hours = Math.floor((diff % millisecondsPerDay) / millisecondsPerHour);
    const minutes = Math.floor((diff % millisecondsPerHour) / millisecondsPerMinute);
  
    if (minutes === 1) {
      return `${minutes} minute ago`
    }
    if (minutes < 60) {
      return `${minutes} minutes ago`
    }
    if (hours === 1) {
      return `${hours} hour ago`
    }
    if (hours < 24) {
      return `${hours} hours ago`
    }
    if (hours >= 24 && hours < 48) {
      return `${days} day ago`
    }
    if (hours > 24) {
      return `${days} days ago`
    }

  }

  const dispatch = useDispatch();

  const tagHandler = (value: string) => {
    dispatch(setJob(value))
  }
  return (
    <Link href='/developer' className={s.card}>
      <div className={s.card__block}>
        <h2 className={s.card__block_title}>{cardInfo.fields['Job Title']}</h2>
        <p className={s.card__block_desc}>{makeDate(cardInfo.fields.Posted)}</p>
      </div>

      <div className={s.card__icon_block}>
        <Door />
        <span>{cardInfo.fields.Company}</span>
      </div>
      <div className={s.card__icon_block}>
        <Location />
        <span>{cardInfo.fields.Location}</span>
      </div>

      <div className={s.card__block}>
        <ul className={s.card__block_list}>
          <li className={`${s.card__block_list_item} ${cardInfo.fields.Status === 'Closed' && s.closed}`}>
            {cardInfo.fields.Status}
          </li>
          {cardInfo.fields.Tags.map(tag => (
            <li onClick={() => tagHandler(tag)} className={s.card__block_list_item} key='tag'>{tag}</li>
          ))}
        </ul>
        {cardInfo.fields['Salary Short'] &&
        <span className={s.card__block_year}>{cardInfo.fields['Salary Short']}  / year</span>
        }
        </div>
    </Link>
  )
}
