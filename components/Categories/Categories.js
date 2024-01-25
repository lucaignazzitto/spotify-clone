import { Row, Col } from 'react-bootstrap'
import Category from '@/components/Categories/Category'
import GenericSlider from '@/components/Slider/GenericSlider'
import ArtistLoader from '@/components/Loader/ArtistLoader'

export default function Categories ({ useAsSlide = false, itemsPerRow = 4, categories = [], className = "", title, isLoading, notFoundMessage = "No categories found" }) {

  const CategoriesList = ({ categories }) => {
    if (useAsSlide) {
      return (
        <GenericSlider slidesPerView={itemsPerRow}>
          {
            categories.map((category, index) => (
              <Category category={category} key={`slide-${index}`}/>
            ))
          }
        </GenericSlider>
      )
    } else {
      return (
        <Row>
          {
            categories.map((category, index) => (
              <Col xs={6} sm={4} md={3} lg={ 12 / itemsPerRow}>
                <Category category={category} key={`row-${index}`}/>
              </Col>
            ))
          }
        </Row>
      )
    }
  }

  return (
    <div className={className}>
      { title ? <div>{title}</div> : null }
      {
        isLoading ? <ArtistLoader direction="horizontal" times={4} md={4} sm={3} xs={6} />
        :
        categories && categories.length ?
          <CategoriesList categories={categories} />
        : <p>{notFoundMessage}</p>
      }
    </div>
  )
}