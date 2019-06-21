const initialState = {
  books: [],
  loaded: false,
  error: null,
  cartItems: [],
  orderTotal: 1000
};
const updateCartItems = (cartItems, item, idx) => {
  //remove one
  if (item.count === 0) {
    return [...cartItems.slice(0, idx), ...cartItems.slice(idx + 1)];
  }
  //add
  if (idx === -1) {
    return [...cartItems, item];
  }
  return [...cartItems.slice(0, idx), item, ...cartItems.slice(idx + 1)];
};

const updateCartItem = (book, item = {}, quantity) => {
  const { id = book.id, count = 0, title = book.title, total = 0 } = item;

  return {
    id,
    title,
    count: count + quantity,
    total: total + quantity * book.price
  };
};

const updateOrder = (state, bookId, quantity) => {
  const { books, cartItems } = state;

  const book = books.find(({ id }) => id === bookId);
  const itemIndex = cartItems.findIndex(({ id }) => id === bookId);
  const item = cartItems[itemIndex];

  const newItem = updateCartItem(book, item, quantity);
  return {
    ...state,
    cartItems: updateCartItems(cartItems, newItem, itemIndex)
  };
};

const booksReducer = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        ...state,
        books: [],
        loaded: false,
        error: null
      };
    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        books: action.payload,
        loaded: true,
        error: null
      };
    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        books: [],
        loaded: true,
        error: action.payload
      };
    case 'ALLREMOVE_ADDED_TOCART':
      const item = state.cartItems.find(({ id }) => id === action.payload);
      return updateOrder(state, action.payload, -item.count);

    case 'BOOK_ADDED_TOCART':
      return updateOrder(state, action.payload, 1);

    case 'REMOVE_ADDED_TOCART':
      return updateOrder(state, action.payload, -1);

    default:
      return state;
  }
};

export default booksReducer;
