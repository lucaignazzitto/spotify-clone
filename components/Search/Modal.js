'use client'
import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation'
import { FormControl } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap'
import debounce from 'lodash/debounce'
import HttpProvider from '@/services/HttpProvider'
import Modal from 'react-bootstrap/Modal';
import Tracks from "@/components/Tracks/Tracks"
import Artists from '@/components/Artists/Artists'
import GenericAlbums from "@/components/Albums/GenericAlbums"
import style from './Modal.module.scss'

function SearchModal({ show = false, onModalClose = () => {} }) {

  const [showModal, setShowModal] = useState(show);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [response, setResponse] = useState()

  const pathname = usePathname()

  const resetModal = () => {
    setResponse({})
  } 

  const handleClose = (e) => {
    setShowModal(false)
    return onModalClose(e)
  };

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

  useEffect(() => {
    setShowModal(show)
  }, [show])

  useEffect(() => {
    handleClose(false)
  }, [pathname])

  return (
    <Modal
    show={showModal}
    onExited={resetModal}
    onHide={handleClose}
    centered
    size="lg"
    className={style.searchModal}>
      <Modal.Body className={style.searchModalBody}>
        <div className={style.searchModalContent}>
          <h4 className={style.searchModalContentTitle}>Cosa vuoi ascoltare?</h4>
          <div className={style.searchModalContentInput}>
            <FormControl placeholder='Cerca' onChange={searchHandler} />
          </div>
          <p className={style.searchModalContentDescription}>Ricera per brano, artista, playlist</p>
        </div>
        <div className={`${style.searchModalResult} ${keyword && keyword.length > 0 ? '' : 'd-none'}`}>
          <Row>
            <Col md={12}>
              <Artists direction='horizontal' artists={response?.artists?.items} showType={true} isLoading={loading} className={style.searchModalResultArtists} title={<h3>Artisti</h3>} />
            </Col>
            <Col md={12}>
              <Tracks direction='horizontal' tracks={response?.tracks?.items} showImage={true} isLoading={loading} className={style.searchModalResultTracks} title={<h3>Brani</h3>} />
            </Col>
            <Col md={12}>
              <GenericAlbums direction='horizontal' albums={response?.albums?.items} isLoading={loading} className={style.searchModalResultAlbums} title={<h3>Albums</h3>} />
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SearchModal;