import Image from 'next/image';
import { useRouter } from 'next/router';
import s from './Tag.module.scss';

export const Tag = ({ value }: { value: string }) => {
const router = useRouter()

  const tagHandler = () => {

    router.push({
      pathname: router.pathname,
      query: { page: '1' }
    })
  }

  return (
    <button onClick={tagHandler} className={s.tag}>
      <Image src='/close.svg' width='16' height='16' alt='delete' />
      <span>{value}</span>
    </button>
  )
}