import React, { useState, useEffect } from 'react';

const Books = ({ show, result, ALL_BOOKS, client }) => {
	const [genres, setGenres] = useState([]);
	const [selectedGenre, setSelectedGenre] = useState(null);
	const [filteredBooks, setFilteredBooks] = useState([]);
	const books = result.data.allBooks;

	useEffect(() => {
		console.log('change of genre', selectedGenre)
		if (show) {
			(async() => {
				const { data } = await client.query({
					query: ALL_BOOKS,
					variables: { genre: selectedGenre },
					fetchPolicy: 'no-cache'
				});
				setFilteredBooks(data.allBooks);

			})();
		}
	}, [selectedGenre]);

	useEffect(() => {
		if(show && books) {
			let allGenres = [];
			if (books)
				books.map(book => allGenres = allGenres.concat(book.genres.filter(genre => allGenres.indexOf(genre) < 0)));
			setGenres(allGenres);
			if(!selectedGenre)
				setFilteredBooks(books);
		}else if(!show)
			setSelectedGenre(null);
	}, [show, books]);


	if (result.loading) {
		return <div>loading...</div>;
	}

	if (!show) {
		return null;
	}

	// const getGenres = () => {
	// 	let allGenres = [];
	// 	if(books)
	// 		books.map(book => allGenres = allGenres.concat(book.genres.filter(genre => allGenres.indexOf(genre)<0)));
	// 	console.log(allGenres);
	// 	return allGenres;
	// };

	const changeSelectedGenre = (genre) => {
		return () => {
			setSelectedGenre(genre);
		};
	};

	return (
		<div>
			<h2>books</h2>
			{selectedGenre ? <div>in genre <strong>{selectedGenre}</strong></div> : null}
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
			{genres.map(genre => <button key={genre} onClick={changeSelectedGenre(genre)}>{genre}</button>)}
			<button onClick={changeSelectedGenre(null)}>All genres</button>
		</div>
	);
};

export default Books;