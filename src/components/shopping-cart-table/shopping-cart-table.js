import React from 'react';
import { connect } from 'react-redux';
// import { booksLoaded, booksLoading, booksError } from '../../actions';
import './shopping-cart-table.css';
import {
  // inCrease,
  inDecrase,
  deleteItem,
  booksAddedToCart
} from '../../actions';

const ShoppingCartTable = ({
  cartItems,
  orderTotal,
  booksAddedToCart,
  inDecrase,
  deleteItem
}) => {
  return (
    <div className="shopping-cart-table">
      <h2>Your Order</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item, idx) => {
            const { id, title, count, total } = item;
            return (
              <tr key={id}>
                <td>{idx + 1}</td>
                <td>{title}</td>
                <td>{count}</td>
                <td>${total}</td>
                <td>
                  <button
                    onClick={() => deleteItem(id)}
                    className="btn btn-outline-danger btn-sm float-right"
                  >
                    <i className="fa fa-trash-o" />
                  </button>
                  <button
                    onClick={() => booksAddedToCart(id)}
                    className="btn btn-outline-success btn-sm float-right"
                  >
                    <i className="fa fa-plus-circle" />
                  </button>
                  <button
                    onClick={() => inDecrase(id)}
                    className="btn btn-outline-warning btn-sm float-right"
                  >
                    <i className="fa fa-minus-circle" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="total">Total: ${orderTotal}</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cartItems: state.book.cartItems,
    orderTotal: state.book.orderTotal
  };
};

const mapDispatchToProps = {
  booksAddedToCart,
  inDecrase,
  deleteItem
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCartTable);
