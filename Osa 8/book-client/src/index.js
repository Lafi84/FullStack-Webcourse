import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloProvider } from '@apollo/react-hooks';
import client from './utils/book_apollo_client';

ReactDOM.render(
	<ApolloProvider client={client} >
		<App/>
	</ApolloProvider>, document.getElementById('root'));