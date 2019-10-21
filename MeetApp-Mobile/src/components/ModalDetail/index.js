import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';

import {
	TextDescription,
	ButtonClose,
	ButtonCloseText,
	WrapperModal,
} from './styles';

export default function ModalDetail({ visible, description, onClose }) {
	return (
		<Modal animationType="slide" transparent={false} visible={visible}>
			<WrapperModal>
				<TextDescription>{description}</TextDescription>

				<ButtonClose onPress={onClose}>
					<ButtonCloseText>FECHAR</ButtonCloseText>
				</ButtonClose>
			</WrapperModal>
		</Modal>
	);
}

ModalDetail.propTypes = {
	description: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
};
