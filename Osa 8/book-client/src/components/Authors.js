import React, { useState } from 'react';
import AuthorEditForm from './Author_Edit_Form';

const Authors = ({ show, result, editAuthor, showEdit }) => {
	if (!show) {
		return null;
	}

	if (result.loading) {
		return <div>loading...</div>;
	}
	const authors = result.data.allAuthors;
	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>
                          born
						</th>
						<th>
                          books
						</th>
					</tr>
					{authors.map(a =>
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					)}
				</tbody>
			</table>

			{showEdit ? <AuthorEditForm authors={authors} editAuthor={editAuthor}/> : null}
		</div>
	);
};

export default Authors;