import React from 'react';
import { useState } from 'react';

const useField = ({ type }) => {
	const [value, setValue] = useState('');

	const onChange = (event) => {
		setValue(event.target.value);
	};

	const reset = () => {
		setValue('');
	};

	const getInit = () => {
		return { type, value, onChange };
	};

	return {
		getInit,
		type,
		value,
		onChange,
		reset
	};
};

export default useField;