import React from 'react';
import { changeFilter } from '../reducers/filterReducer';
import { connect } from 'react-redux';

const Filter = ({ changeFilter }) => {
	const style = {
		marginBottom: 10
	};

	return (
		<div style={style}>
			<label>
				Filter
				<input type="text" onChange={e => changeFilter(e.target.value)}/>
			</label>
		</div>
	);
};

const mapDispatchToProps = {
	changeFilter
};

export default connect(
	null,
	mapDispatchToProps
)(Filter);