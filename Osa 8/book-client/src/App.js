import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { gql } from 'apollo-boost';
import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks';
import LoginForm from './components/Login_Form';
import Recommendations from './components/Recommendations';

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`;

const ALL_AUTHORS = gql`
  {
  	allAuthors {
  		id,
    	name,
    	born,
    	bookCount
  	}
  }
`;

const ME = gql`
  {
  	me {
    	username,
    	favoriteGenre
  	}
  }
`;

const ALL_BOOKS = gql`
  query allBooks($genre: String){
  	allBooks(genre: $genre) {
    	id,
    	title,
    	published,
		author{
			name
    	},
    	genres
  	}
  }
`;

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
		title: $title
		author: $author
		published: $published
		genres: $genres
    ) {
		id,
		title,
		published,
		author{
			id,
			name
    	},
		genres
    }
  }
`;

const EDIT_AUTHOR = gql`
  mutation editAuthor($author: String!, $bornYear: Int!) {
    editAuthor(
		name: $author
		setBornTo: $bornYear
    ) {
  		id,
    	name,
    	born,
    	bookCount
    }
  }
`;

const App = () => {
	const [page, setPage] = useState('login');
	const [errorMessage, setErrorMessage] = useState(null);
	const [token, setToken] = useState(null);

	const handleError = (error) => {
		setErrorMessage(error.graphQLErrors[0].message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 10000);
	};

	const client = useApolloClient();
	const authors = useQuery(ALL_AUTHORS);
	const user = useQuery(ME);
	const books = useQuery(ALL_BOOKS);

	const [addBook] = useMutation(ADD_BOOK, {
		onError: handleError,
		refetchQueries: [{ query: ALL_BOOKS, ALL_AUTHORS }]
	});

	const [editAuthor] = useMutation(EDIT_AUTHOR, {
		onError: handleError,
		refetchQueries: [{ query: ALL_AUTHORS }]
	});

	const [login] = useMutation(LOGIN, {
		onError: handleError
	});

	const logout = () => {
		setToken(null);
		localStorage.removeItem('books-user-token');
	};

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				{token ? <button onClick={() => setPage('recommendations')}>recommendations</button>: null }
				{token ? <button onClick={() => setPage('add')}>add book</button>: null }
				{token ? <button onClick={logout}>logout</button> : <button onClick={() => setPage('login')}>login</button>}
			</div>

			{errorMessage &&
			<div style={{ color: 'red' }}>
				{errorMessage}
			</div>
			}

			<LoginForm login={login} setToken={setToken} setPage={setPage} show={page === 'login'}/>

			<Authors result={authors} editAuthor={editAuthor} showEdit={!!token} show={page === 'authors'}/>

			<Books client={client} result={books} ALL_BOOKS={ALL_BOOKS} show={page === 'books'}/>

			<Recommendations client={client} ALL_BOOKS={ALL_BOOKS} result={{ books, user }} show={page === 'recommendations'}/>

			<NewBook addBook={addBook} show={page === 'add'}/>

		</div>
	);
};

export default App;