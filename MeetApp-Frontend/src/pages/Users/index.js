import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdChevronLeft } from 'react-icons/md';
import { updateUserRequest } from '../../store/modules/user/actions';
import { Container } from './styles';
import { TitlePage } from '../../components/TitlePage';
import FormUser from '../../components/FormUser';

export default function Users() {
	const dispatch = useDispatch();
	const profile = useSelector(state => state.user.profile);
	const loadingSave = useSelector(state => state.user.loading);

	function handleSubmit(data) {
		dispatch(updateUserRequest(data));
	}

	return (
		<Container>
			<TitlePage>
				<h1>
					<Link to="/">
						<MdChevronLeft color="#FFF" size={28} />
					</Link>
					MEU PERFIL
				</h1>
			</TitlePage>

			<FormUser
				profile={profile}
				onSubmit={handleSubmit}
				loading={loadingSave}
			/>
		</Container>
	);
}
