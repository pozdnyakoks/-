import { Skeleton } from "@/components/skeleton/Skeleton"
import s from './SleketonList.module.scss'

export const SkeletonList = () => {
  return (
    <div className={s.skeleton_list}>
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