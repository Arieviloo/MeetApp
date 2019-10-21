import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { useField } from '@rocketseat/unform';
import { subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({ name }) {
	const { fieldName, registerField, defaultValue, error } = useField(name);
	const [selected, setSelected] = useState(defaultValue);

	const ref = useRef();

	registerLocale('pt-BR', pt);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: ref.current,
			path: 'props.selected',
			clearValue: pickerRef => {
				pickerRef.clear();
			},
		});
  }, [ref.current, fieldName]); // eslint-disable-line

	return (
		<>
			<ReactDatePicker
				name={fieldName}
				selected={selected}
				onChange={date => setSelected(date)}
				ref={ref}
				locale={pt}
				showTimeSelect
				timeIntervals={30}
				placeholderText="Escolha a Data"
				timeCaption="Horas"
				dateFormat="Pp"
				minDate={subDays(new Date(), 0)}
			/>
			{error && <span>Esse campo é obrigatório.</span>}
		</>
	);
}

DatePicker.propTypes = {
	name: PropTypes.string.isRequired,
};
