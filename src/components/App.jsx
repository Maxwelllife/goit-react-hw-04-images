import 'modern-normalize/modern-normalize.css';
import { useState, useEffect, useCallback } from 'react';
import pixabayAPI from '../services/api';
// import { pixabayAPI } from '../services/api';

import { Modal, Button, Loader, ImageGallery, Searchbar } from '../components';

const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [request, setRequest] = useState('');
  const [imgAttributes, setImgAttributes] = useState({ url: '', alt: '' });

  const fetchPhotosGallary = useCallback(async (request, page) => {
    setIsLoading(true);

    try {
      const { total, totalHits, hits } = await pixabayAPI.getGallary(
        request,
        page
      );

      setItems(items => [...items, ...hits]);
      setPages(total / totalHits);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (request === '' && page === 1) return;
    console.log(error);
    fetchPhotosGallary(request, page);
  }, [page, request, fetchPhotosGallary, error]);

  useEffect(() => {
    if (page > 1) {
      window.scrollBy({
        top: window.innerHeight - 140,
        behavior: 'smooth',
      });
    }
  }, [items, page]);

  const handleFormSubmit = query => {
    if (!query.trim() || request === query) return;
    setRequest(query);
    setPage(1);
    setItems([]);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = (url, alt) => {
    setImgAttributes({
      url: url,
      alt: alt,
    });
  };
  const closeModal = useCallback(() => {
    setImgAttributes({
      url: '',
    });
  }, []);

  const { url, alt } = imgAttributes;
  return (
    <div className="app">
      <Searchbar catchSubmitInfo={handleFormSubmit} />
      {isLoading && <Loader />}

      <ImageGallery hits={items} onItemClick={openModal} />

      {pages > page && <Button onClick={handleLoadMore} />}

      {url && (
        <Modal onClose={closeModal}>
          <img src={url} alt={alt} />
        </Modal>
      )}
    </div>
  );
};
export default App;
