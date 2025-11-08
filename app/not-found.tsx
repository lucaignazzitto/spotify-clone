import Button from '@/components/Buttons/Button'
import Link from 'next/link'
import style from './not-found.module.scss'
import Image from 'next/image'
import notFound from '@/public/images/404.jpg'

export default function NotFound() {
  return (
    <div className={style.mainWrapp}>
      <div className={style.mainRound}></div>
      <div className={style.smallRound}></div>
      <h1 className={style.title}>
        <span>4</span>
        <div className={style.middleZero}>
          <Image src={notFound.src} alt="dd" fill style={{ objectFit: 'cover'}} />
        </div>
        <span>4</span>
      </h1>
      <p className={style.desc}>Seems you lost</p>
      <Link href={'/'}>
        <Button className='btn btn-primary' text="go back home"></Button>
      </Link>
    </div>
  )
}