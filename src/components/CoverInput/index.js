import React, { useEffect, useState, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import { MdCameraAlt } from 'react-icons/md';
import api from '../../services/api';

import { Container, SelectImage } from './styles';

export default function CoverInput() {
	const { defaultValue, registerField } = useField('files');

	const [file, setFile] = useState(defaultValue && defaultValue.id);
	const [preview, setPreview] = useState(defaultValue && defaultValue.url);

	const ref = useRef();

	useEffect(() => {
		if (ref.current) {
			registerField({
				name: 'file_id',
				ref: ref.current,
				path: 'dataset.file',
			});
		}
	}, [ref.current]); // eslint-disable-line

	async function handleChange(e) {
		const data = new FormData();

		data.append('file', e.target.files[0]);

		const response = await api.post('files', data);
		const { id, url } = response.data;

		setFile(id);
		setPreview(url);
	}

	return (
		<Container>
			<label htmlFor="files">
				{preview ? (
					<>
						<img src={preview} alt="Foto" />
						<div className="select">
							Clique na imagem para alterar
						</div>
					</>
				) : (
					<SelectImage>
						<MdCameraAlt size={50} />
						<strong>Selecionar Imagem</strong>
					</SelectImage>
				)}

				<input
					type="file"
					data-file={file}
					id="files"
					accept="image/*"
					onChange={handleChange}
					ref={ref}
				/>
			</label>
		</Container>
	);
}
