import React, { Component } from 'react';
import { arrayOf, bool, func, object } from 'prop-types';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { BooksList } from 'components/BooksList';

import { deleteBookAction, editBookAction, getBooksAction } from './actions';

class HomePage extends Component {
  static propTypes = {
    getBooks: func.isRequired,
    books: arrayOf(object).isRequired,
    loaded: bool.isRequired
  };

  componentDidMount() {
    const { getBooks, loaded } = this.props;
    if (!loaded) getBooks();
  }

  render() {
    const { books, loaded, editBook, deleteBook } = this.props;
    if (!loaded) return null;
    return (
      <Grid container justify="center" component="main">
        <BooksList books={books} onEditBook={editBook} onDeleteBook={deleteBook} />
      </Grid>
    );
  }
}

function mapStateToProps({ booksList }) {
  const { books, loaded } = booksList;
  return { books, loaded };
}

function mapDispatchToProps(dispatch) {
  return {
    getBooks() {
      dispatch(getBooksAction());
    },
    editBook(book) {
      dispatch(editBookAction(book));
    },
    deleteBook(id) {
      dispatch(deleteBookAction(id));
    }
  };
}

export const withReduxHomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
