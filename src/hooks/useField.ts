import { ChangeEvent, useCallback, useState } from 'react';

const useField = (id: string, required?: boolean, disabled?: boolean) => {
	const [value, setValue] = useState('');
	const [touched, setTouched] = useState(false);

	const error = required && touched && !value;

	return [
		value,
		{
			id,
			value,
			onChange: useCallback(
				(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
					setValue(e.target.value),
				[]
			),
			onBlur: useCallback(() => setTouched(true), []),
			required,
			disabled,
			error,
			helperText: error ? 'Required' : undefined
		},
		setValue
	] as const;
};

export default useField;
