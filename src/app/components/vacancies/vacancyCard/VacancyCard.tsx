
import s from './VacancyCard.module.scss';
import { Door } from '../../icons/door';
import { Location } from '../../icons/location';

type TCard = {

  title: string,
  date: string,
  company: string,
  location: string,
  status: string,
  tags: string[],
  salary: string
}

export const VacancyCard = ({ cardInfo }: { cardInfo: TCard }) => {
  return (
    <div className={s.card}>
      <div className={s.card__block}>
        <h2 className={s.card__block_title}>{cardInfo.title}</h2>
        <p className={s.card__block_desc}>{cardInfo.date}</p>
      </div>

      <div className={s.card__icon_block}>
        <Door />
        <span>{cardInfo.company}</span>
      </div>
      <div className={s.card__icon_block}>
        <Location />
        <span>{cardInfo.location}</span>
      </div>

      <div className={s.card__block}>
        <ul className={s.card__block_list}>
          <li className={`${s.card__block_list_item} ${cardInfo.status === 'Closed' && s.closed}`}>
            {cardInfo.status}
          </li>
          {cardInfo.tags.map(tag => (
            <li className={s.card__block_list_item} key='tag'>{tag}</li>
          ))}
        </ul>
        <span className={s.card__block_year}>{cardInfo.salary}  / year</span>
      </div>
    </div>
  )
}