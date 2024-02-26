import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '@/lib/slices/isLoadingSlice';
import s from './Tag.module.scss';

export const Tag = ({ value }: { value: string }) => {
  const router = useRouter()
  const pathname = usePathname();

  const dispatch = useDispatch();

  const tagHandler = () => {
    dispatch(setIsLoading(true))
    router.push(pathname + '?page=1')
  }

  return (
    <button onClick={tagHandler} className={s.tag}>
      <Image src='/close.svg' width='16' height='16' alt='delete' />
      <span>{value}</span>
    </button>
  )
}