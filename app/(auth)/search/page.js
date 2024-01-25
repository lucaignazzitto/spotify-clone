'use client'
import { useState, useCallback, useEffect } from 'react';
import { FormControl } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import debounce from 'lodash/debounce'
import HttpProvider from '@/services/HttpProvider'
import Tracks from "@/components/Tracks/Tracks"
import Artists from '@/components/Artists/Artists'
import Categories from '@/components/Categories/Categories'
import GenericAlbums from "@/components/Albums/GenericAlbums"
import pageBg from "@/public/images/bubble-3.jpg"

export default function SearchPage () {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [response, setResponse] = useState()

  const makeSearch = useCallback(debounce((inputValue) => {
    setLoading(true)
    setKeyword(inputValue)
    return HttpProvider
    .get(`/api/search?keyword=${encodeURIComponent(inputValue)}`)
    .then((resp) => {
        setResponse(resp.data.results)
        return resp.data.results
      })
      .catch((err) => {
        return err
      })
      .finally(() => {
        setLoading(false)
      })
  }, 600), [])

  const searchHandler = (e) => {
    const inputValue = e.target.value
    makeSearch(inputValue)
  }

  const browseCategories = () => {
    setLoading(true)
    return HttpProvider.get(`/api/browse/categories`, {
      params: {
        limit: 12
      }
    })
      .then((res) => {
        const { categories = [] } = res.data
        setCategories(categories)
        return categories
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    setLoading(true)
    browseCategories()
  }, [])

  return (
    <main>
      <div className="page-background" style={{ backgroundImage: `url(${pageBg.src})`}}></div>
      <Container>
        <Row>
          <Col xs={12} lg={10} xl={8} className="mx-auto">
            <h1 className="page-title">Cosa vuoi ascoltare</h1>
            <section className={`page-section`}>
              <div>
                <FormControl placeholder='Cerca' onChange={searchHandler} />
              </div>
              <p className='mt-3'>Ricera per brano, artista, playlist</p>
            </section>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {
              keyword && keyword.length > 0 ?
                <div>
                  <section className={`page-section`}>
                    <Tracks direction='horizontal' tracks={response?.tracks?.items} showImage={true} isLoading={loading} title={<h3>Brani</h3>} showOptions />
                  </section>
                  <section className={`page-section`}>
                    <Artists direction='horizontal' artists={response?.artists?.items} showType={true} isLoading={loading} title={<h3>Artisti</h3>} />
                  </section>
                  <section className={`page-section`}>
                    <GenericAlbums direction='horizontal' albums={response?.albums?.items} isLoading={loading} title={<h3>Albums</h3>} />
                  </section>
                </div>
              : <Categories categories={categories?.items} isLoading={loading} notFoundMessage={""} />
            }
          </Col>
        </Row>
      </Container>
    </main>
  )
}
