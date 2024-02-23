import { Skeleton } from "./Skeleton"
import s from './SleketonList.module.scss'


export const SkeletonList = () => {
  return (
      <div className={`${s.skeleton_list} container`}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
  )
}