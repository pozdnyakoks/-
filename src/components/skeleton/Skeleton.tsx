import s from './Skeleton.module.scss';

export const Skeleton = () => {
  return (
    <div className={s.skeleton}>
      <div className={s.skeleton__row}>
        <div className={s.skeleton__row_block}>
          <div className={s.skeleton__cell}></div>
          <div className={s.skeleton__cell}></div>
        </div>
        <div className={`${s.skeleton__cell} ${s.skeleton__cell_small}`}></div>
      </div>

      <div className={s.skeleton__tags}>
        <div className={s.skeleton__tags_row}>
          <div className={s.skeleton__cell}></div>
          <div className={s.skeleton__cell}></div>
        </div>
        <div className={s.skeleton__cell}></div>
      </div>
    </div>
  )
}