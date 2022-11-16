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

  // const galleryFilter = list => {
  //   return list.map(({ id, webformatURL, tags, largeImageURL }) => ({
  //     id,
  //     webformatURL,
  //     tags,
  //     largeImageURL,
  //   }));
  // };

  // const addItemGallery = galleryList => {
  //   page === 1
  //     ? setGallery(galleryFilter(galleryList))
  //     : setGallery(prev => [...prev, ...galleryFilter(galleryList)]);
  // };

  // const setTotalPage = total => this.setState({ totalPage: total });

  const onClickButtonLoadMore = () => {
    setPage(p => p + 1);
    // this.setState(prevState => ({
    //   page: prevState.page + 1,
    // }));
    console.log('load more...');
  };

  const modalSetItem = item => {
    setIsLoading(true);
    setModalItem(item);
  };

  // const modalClose = e => setModalItem(null);

  // this.setState({ modalItem: null });
  const loadingFinish = e => {
    isLoading && setIsLoading(false);
    // this.setState({ isLoading: false });
  };

  useEffect(() => {
    if (searchString !== '') {
      setIsLoading(true);
      // const startFetch = Date.now();
      // console.log('start fetch date: ', startFetch);
      fetchApi({
        searchString: searchString,
        page: page,
        setTotalPage: setTotalPage,
        setGallery: setGallery,
      }).finally(() => {
        // console.log('finale fetch date: ', Date.now() - startFetch, 'ms');
        setIsLoading(false);
      });
    }
    // gallery.length === 0 && setIsLoading(false);
  }, [page, searchString]);

  useEffect(() => {
    page === totalPage ? setIsHaveLoadMore(false) : setIsHaveLoadMore(true);
  }, [page, totalPage]);

  // };
  // componentDidUpdate(prevProps, prevState) {
  //   const { searchString, page, totalPage, gallery } = this.state;
  //   if (prevState.searchString !== searchString || prevState.page !== page) {
  //     this.setState({ isLoading: true });
  //     fetchApi({
  //       searchString: searchString,
  //       page: page,
  //       setTotalPage: this.setTotalPage,
  //       addItemGallery: this.addItemGallery,
  //     });
  //   }
  //   if (prevState.page !== page || prevState.totalPage !== totalPage) {
  //     page === totalPage
  //       ? this.setState({ isHaveLoadMore: false })
  //       : this.setState({ isHaveLoadMore: true });
  //   }
  //   if (gallery.length === 0 && prevState.gallery !== gallery) {
  //     this.setState({ isLoading: false });
  //   }
  // }

  // render() {
  // const { gallery, isHaveLoadMore, modalItem, isLoading } = this.state;
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
          // modalClose={modalClose}
          setModalItem={setModalItem}
        />
      )}
      {isLoading && <Loader />}
    </section>
  );
  // }
}
