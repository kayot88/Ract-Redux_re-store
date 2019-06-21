const booksLoaded = newBooks => {
  return {
    type: 'FETCH_BOOKS_SUCCESS',
    payload: newBooks
  };
};
const booksLoading = () => {
  return {
    type: 'FETCH_BOOKS_REQUEST'
  };
};

const booksError = error => {
  return {
    type: 'FETCH_BOOKS_FAILURE',
    payload: error
  };
};

export const booksAddedToCart = (bookId) => {
  return {
    type: 'BOOK_ADDED_TOCART',
    payload: bookId
  };
};
export const inDecrase = (bookId) => {
  return {
    type: 'REMOVE_ADDED_TOCART',
    payload: bookId
  };
};
export const deleteItem = bookId => {
         return {
           type: 'ALLREMOVE_ADDED_TOCART',
           payload: bookId
         };
       };

const fetchData = (bookstoreService, dispatch) => () => {
  dispatch(booksLoading());
  bookstoreService
    .getBooks()
    .then(data => {
      dispatch(booksLoaded(data));
    })
    .catch(error => {
      dispatch(booksError(error));
    });
};

export { fetchData };
