import {combineReducers} from 'redux'
import booksReducer from './booksReducer';

const rootReducer = combineReducers({
  book: booksReducer

});

export default rootReducer