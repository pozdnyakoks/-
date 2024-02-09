
import s from './VacancyCard.module.scss';
import { Door } from '../../icons/door';
import { Location } from '../../icons/location';
import { useDispatch, useSelector } from 'react-redux';
import { TJob } from '@/lib/types';
import { RootState } from '@/lib/store';
import { setfilteredJobs } from '@/lib/slices/filteredJobsSlice';
import { makeDate } from '@/lib/makeDate';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const VacancyCard = ({ cardInfo }: { cardInfo: TJob }) => {

  const router = useRouter()

  const jobsArray = useSelector(
    (state: RootState) => state.jobs.jobs
  );

  const dispatch = useDispatch();

  const tagHandler = (ev: React.MouseEvent, value: string) => {
    ev.stopPropagation();
    const { pathname, query } = router;

    if (value !== '') {
      router.push({
        pathname,
        query: { page: '1', tag: value }
      });
    } else {
      dispatch(setfilteredJobs(jobsArray))

      delete query.tag; 
      router.push({ pathname, query }, undefined, { shallow: true });
    }
  }

  const cardHandler = () => {
    router.push({
        pathname: `/job/${(cardInfo.fields['Job Title + Company'].trim().replaceAll(/[^a-zA-Z]+/g, '-'))}-${cardInfo.fields['Job ID']}`
    })
  }
  return (
    <div onClick={cardHandler} className={s.card}>
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
            <li onClick={(ev) => tagHandler(ev, tag)} className={s.card__block_list_item} key='tag'>{tag}</li>
          ))}
        </ul>
        {cardInfo.fields['Salary Short'] &&
          <span className={s.card__block_year}>{cardInfo.fields['Salary Short']}  / year</span>
        }
      </div>
    </div>
  )
}
