import React, { useEffect, useState } from 'react';

const Recommendations = ({ show, result, client, ALL_BOOKS }) => {
	const user = result.user.data.me;
	const [filteredBooks, setFilteredBooks] = useState([]);

	useEffect(() => {
		if (show && user) {
			(async() => {
				const { data } = await client.query({
					query: ALL_BOOKS,
					variables: { genre: user.favoriteGenre },
					fetchPolicy: 'no-cache'
				});
				setFilteredBooks(data.allBooks);

			})();
		}
	}, [show, user]);

	if (!show) {
		return null;
	}
	if (result.books.loading || result.user.loading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<h2>recommendations</h2>
			{user.favoriteGenre ? <div>in your favourite genre <strong>{user.favoriteGenre}</strong></div> : null}
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>
						author
						</th>
						<th>
						published
						</th>
					</tr>
					{filteredBooks.map(a =>
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Recommendations;