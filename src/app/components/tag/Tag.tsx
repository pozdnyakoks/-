import { useDispatch } from 'react-redux';
import s from './Tag.module.scss';
import Image from 'next/image';

import { setJob } from '@/lib/slices/jobSlice';

export const Tag = ({ value }: { value: string }) => {
  const dispatch = useDispatch();

  const tagHandler = () => {
    dispatch(setJob(''))
  }

  return (
    <button onClick={tagHandler} className={s.tag}>
      <Image src='/close.svg' width='16' height='16' alt='delete' />
      <span>{value}</span>
    </button>
  )
}