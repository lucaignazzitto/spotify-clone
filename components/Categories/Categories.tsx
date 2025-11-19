"use client"
import { motion } from 'framer-motion'
import { Row, Col } from 'react-bootstrap'
import Category from '@/components/Categories/Category'
import GenericSlider from '@/components/Slider/GenericSlider'
import ArtistLoader from '@/components/Loader/ArtistLoader'
import { CategoryInteface } from '@/lib/models/category.interface'
import { ReactNode } from 'react'

type Props = {
  useAsSlide?: boolean
  itemsPerRow?: number,
  categories?: CategoryInteface[],
  className?: string,
  title?: string | ReactNode,
  isLoading?: boolean,
  notFoundMessage?: string,
}

const CategoriesList = ({ categories, useAsSlide, itemsPerRow }) => {
  if (useAsSlide) {
    return (
      <GenericSlider slidesPerView={itemsPerRow}>
        {
          categories.map((category, index) => (
            <motion.div
              key={`slide-${index}`}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <Category category={category} />
            </motion.div>
          ))
        }
      </GenericSlider>
    )
  } else {
    return (
      <Row>
        {
          categories.map((category, index) => (
            <Col xs={6} sm={4} md={3} lg={12 / itemsPerRow} key={index}>
              <motion.div
                key={`row-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Category category={category} />
              </motion.div>
            </Col>
          ))
        }
      </Row>
    )
  }
}

export default function Categories({
  useAsSlide = false,
  itemsPerRow = 4,
  categories = [],
  className = "",
  title,
  isLoading,
  notFoundMessage = "No categories found"
}: Props) {

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={className}
      variants={{
        visible: {
          transition: {
            staggerChildren: .05
          }
        }
      }}
    >
      {title ? <div>{title}</div> : null}
      {
        isLoading ? <ArtistLoader direction="horizontal" times={4} md={4} sm={3} xs={6} />
          :
          categories && categories.length ?
            <CategoriesList categories={categories} useAsSlide={useAsSlide} itemsPerRow={itemsPerRow} />
            : <p>{notFoundMessage}</p>
      }
    </motion.div>
  )
}