import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import { withBookstoreService } from '../hoc';
import { fetchData, booksAddedToCart } from '../../actions';
import { compose } from '../../utils';

import './book-list.css';

const BookList = ({ books, onAddedToCart}) => {
  return (
    <ul className="book-list">
      {books.map(book => {
        return (
          <li key={book.id}>
            <BookListItem
              book={book}
              onAddedToCart={() => onAddedToCart(book.id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

class BookListContainer extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const { books, loaded, error, onAddedToCart } = this.props;
    if (error) {
      return <ErrorIndicator />;
    }
    if (!loaded) {
      return <Spinner />;
    }
    return <BookList books={books} onAddedToCart={onAddedToCart} />;
  }
}

const mapStateToProps = state => {
  return {
    books: state.book.books,
    loaded: state.book.loaded,
    error: state.book.error
  };
};

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
  return {
    fetchData: fetchData(bookstoreService, dispatch),
    onAddedToCart: id => dispatch(booksAddedToCart(id))
  };
};

export default compose(
  withBookstoreService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BookListContainer);
