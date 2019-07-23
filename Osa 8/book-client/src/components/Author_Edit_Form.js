import React, { useState } from 'react';

const AuthorEditForm = ({ authors, editAuthor }) => {
	const [author, setAuthor] = useState('');
	const [bornYear, setBornYear] = useState('');

	if (authors.loading) {
		return null;
	}

	const handleEditAuthor = async(e) => {
		e.preventDefault();

		await editAuthor({ variables: { author, bornYear: parseInt(bornYear) } });
		setAuthor('');
		setBornYear('');
	};

	return(
		<div>
			<h3>Add book</h3>
			<form onSubmit={handleEditAuthor}>
				<select onChange={({ target }) => setAuthor(target.value)}>
					{authors.map(a =>
						<option key={a.id} value={a.name}>{a.name}</option>
					)}
				</select>
				<div>
					Born year
					<input
						value={bornYear}
						type="number"
						onChange={({ target }) => setBornYear(target.value)}
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default AuthorEditForm;