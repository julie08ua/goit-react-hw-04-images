import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getImages } from 'services/getImages';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ModalWindow } from './Modal/Modal';
import { AppWrap } from './App.styled';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [urlBig, setUrlBig] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (!searchValue){
        return;
      }

      setStatus('pending');

      try {
        const images = await getImages(searchValue, page);

        if (!images.hits.length) {
          setError("No images found for your request(:");
          setStatus('rejected');
        } else {
          setImages(prevImages => [...prevImages, ...images.hits]);
          setStatus('resolved');
        }
      } catch (error) {
        setError(error.message);
        setStatus('rejected');
      }
    }
    fetchData();
  }, [page, searchValue])
  
  const receiveTextForSearch = text => {
    setSearchValue(text);
    setImages([]);
    setPage(1);
  };

  const onClickLoadMore = () => {
    setPage(page => page + 1);
  };

  const openModal = ({ target }) => {
    setUrlBig(target.dataset.url);
    setAlt(target.name)
  
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const isBtnVisible = status === 'resolved' && images.length >= 12;

    return (
      <AppWrap>
        <Searchbar onSubmit={receiveTextForSearch} />

        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <ImageGallery images={images} onOpenModal={openModal} />
        )}
        {status === 'rejected' && <p>{error}</p>}
        {isBtnVisible && <Button onClick={onClickLoadMore} />}

        {showModal && (
          createPortal(
            <ModalWindow closeModal={toggleModal}>
            <img src={urlBig} alt={alt} />
            </ModalWindow>, document.body)
          
        )}

        <ToastContainer autoClose={2500} />
      </AppWrap>
    );
}