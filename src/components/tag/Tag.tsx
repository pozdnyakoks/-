import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import s from './Tag.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { setIsFetched } from '@/lib/slices/isFetchedSlice';

export const Tag = ({ value }: { value: string }) => {
  const router = useRouter()
  const pathname = usePathname();

  const dispatch = useDispatch();

  const tagHandler = () => {
    router.push(pathname + '?page=1')
  }

  return (
    <button onClick={tagHandler} className={s.tag}>
      <Image src='/close.svg' width='16' height='16' alt='delete' />
      <span>{value}</span>
    </button>
  )
}