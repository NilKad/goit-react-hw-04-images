import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchApi } from './API/fetchApi';
import { useState, useEffect } from 'react';
import { Button } from './Button/Button';

import css from './App.module.css';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export default function App() {
  const [gallery, setGallery] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [modalItem, setModalItem] = useState(null);
  const [isHaveLoadMore, setIsHaveLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchSubmit = item => {
    item.preventDefault();
    setSearchString(item.currentTarget.search.value);
    setTotalPage(1);
    // this.setState({ searchString: item.currentTarget.search.value, page: 1 });
    window.scrollTo(0, 0);
  };

  const onClickButtonLoadMore = () => {
    setPage(p => p + 1);
    console.log('load more...');
  };

  const modalSetItem = item => {
    setIsLoading(true);
    setModalItem(item);
  };

  const loadingFinish = e => {
    isLoading && setIsLoading(false);
  };

  useEffect(() => {
    if (searchString !== '') {
      setIsLoading(true);
      fetchApi({
        searchString: searchString,
        page: page,
        setTotalPage: setTotalPage,
        setGallery: setGallery,
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [page, searchString]);

  useEffect(() => {
    page === totalPage ? setIsHaveLoadMore(false) : setIsHaveLoadMore(true);
  }, [page, totalPage]);

  return (
    <section className={css.App}>
      <Searchbar seacrhSubmit={searchSubmit} />
      <ImageGallery
        onLoadingFinish={loadingFinish}
        galleryList={gallery}
        modalOpen={modalSetItem}
      ></ImageGallery>

      <div className={css.pagination}>
        {gallery.length > 0 && isHaveLoadMore && (
          <Button text="Load more" onClickButton={onClickButtonLoadMore} />
        )}
      </div>
      {modalItem && (
        <Modal
          onLoadingFinish={loadingFinish}
          modalItem={modalItem}
          setModalItem={setModalItem}
        />
      )}
      {isLoading && <Loader />}
    </section>
  );
  // }
}
