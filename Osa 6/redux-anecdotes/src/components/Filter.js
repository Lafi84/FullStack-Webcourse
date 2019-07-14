import React from 'react';
import { changeFilter } from '../reducers/filterReducer';

const Filter = ({ store }) => {

	return (
		<div>
			<label>
				Filter
				<input type="text" onChange={e => store.dispatch(changeFilter(e.target.value))}/>
			</label>
		</div>
	);
};

export default Filter;