"use client"
import { motion } from 'framer-motion'
import Button from '@/components/Buttons/Button'
import Link from 'next/link'
import style from './not-found.module.scss'
import Image from 'next/image'
import notFound from '@/public/images/404.jpg'

export default function NotFound() {
  return (
    <motion.div
      className={style.mainWrapp}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: .04
          }
        }
      }}
    >

      <div className={style.mainRound}></div>
      <div className={style.smallRound}></div>
      <h1 className={style.title}>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 }
          }}>4</motion.div>
        <motion.div className={style.middleZero} variants={{
          hidden: { opacity: 0, scale: 1.5 },
          visible: { opacity: 1, scale: 1 }
        }}>
          <Image src={notFound.src} alt="Not found page" fill style={{ objectFit: 'cover' }} />
        </motion.div>
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}>4</motion.span>
      </h1>
      <motion.div 
      className='text-center'
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}>
        <p className={style.desc}>Seems you lost</p>
        <Link href={'/'}>
          <Button className='btn btn-primary' variant='primary' text="go back home"></Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}