import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { RootState } from '@/lib/store';
import { setfilteredJobs } from '@/lib/slices/filteredJobsSlice';
import { makeDate } from '@/lib/makeDate';
import { TJob } from '@/lib/types';
import { Door } from '../../icons/door';
import { Location } from '../../icons/location';
import s from './VacancyCard.module.scss';

export const VacancyCard = ({ cardInfo }: { cardInfo: TJob }) => {

  const router = useRouter()
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const jobsArray = useSelector(
    (state: RootState) => state.jobs.jobs
  );

  const dispatch = useDispatch();

  const tagHandler = (ev: React.MouseEvent, value: string) => {
    ev.preventDefault()
    ev.stopPropagation();
    if (value !== '') {
      router.push(pathname + '?' + `page=1&tag=${value}`);
    } else {
      dispatch(setfilteredJobs(jobsArray))
      router.push(pathname + '?' + `page=${searchParams.get('page') || 1}`);
    }
  }

  const linkMaker = () => {
    return `/job/${(cardInfo.fields['Job Title + Company'].trim().replaceAll(/[^a-zA-Z]+/g, '-'))}-${cardInfo.fields['Job ID']}`
  }

  const cardHandler = (ev: React.MouseEvent) => {
    const target = ev.target as HTMLElement;
    const isButton = target.tagName.toLowerCase() === 'button';

    if (!isButton) {
      router.push(linkMaker());
    }
  }

  const linkHandler = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault()
  }

  return (
    <div onClick={cardHandler} className={s.card}>
      <a href={linkMaker()} onClick={(ev) => linkHandler(ev)}>
        <div className={s.card__content}>
          <div className={s.card__block}>
            <h2 className={s.card__block_title}>{cardInfo.fields['Job Title']}</h2>
            <p className={s.card__block_desc}>{makeDate(cardInfo.fields['Posted Actual Time'])}</p>
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
            <div className={s.card__block_list}>
              <button className={`${s.card__block_list_item} ${cardInfo.fields.Status === 'Closed' && s.closed}`} disabled>
                {cardInfo.fields.Status}
              </button>
              {cardInfo.fields.Tags.map(tag => (
                <button onClick={(ev) => tagHandler(ev, tag)} className={s.card__block_list_item} key={tag}>{tag}</button>
              ))}
            </div>
            {cardInfo.fields['Salary Short'] &&
              <span className={s.card__block_year}>{cardInfo.fields['Salary Short']}  / year</span>
            }
          </div>
        </div>
      </a>
    </div>
  )
}
