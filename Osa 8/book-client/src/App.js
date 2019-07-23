import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { gql } from 'apollo-boost';
import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks';


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

const ALL_BOOKS = gql`
  {
  	allBooks {
    	id,
    	title,
    	published,
    	author,
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
		author,
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
	const [page, setPage] = useState('authors');
	const [errorMessage, setErrorMessage] = useState(null);

	const handleError = (error) => {
		setErrorMessage(error.graphQLErrors[0].message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 10000);
	};

	const client = useApolloClient();
	const authors = useQuery(ALL_AUTHORS);
	const books = useQuery(ALL_BOOKS);

	const [addBook] = useMutation(ADD_BOOK, {
		onError: handleError,
		refetchQueries: [{ query: ALL_BOOKS }]
	});

	const [editAuthor] = useMutation(EDIT_AUTHOR, {
		onError: handleError,
		refetchQueries: [{ query: ALL_AUTHORS }]
	});


	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('add')}>add book</button>
			</div>

			{errorMessage &&
			<div style={{ color: 'red' }}>
				{errorMessage}
			</div>
			}

			<Authors result={authors} editAuthor={editAuthor} show={page === 'authors'}/>

			<Books result={books} show={page === 'books'}/>

			<NewBook addBook={addBook} show={page === 'add'}/>
		</div>
	);
};

export default App;