import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Container, Wrapper, Profile } from './styles';
import { logoutRequest } from '../../store/modules/auth/actions';
import logo from '../../assets/images/meetapp-logo.svg';

export default function Header() {
	const dispatch = useDispatch();
	const [top, setTop] = useState(0);
	const profile = useSelector(state => state.user.profile);

	function handleLogout() {
		dispatch(logoutRequest());
	}

	function handleScroll() {
		setTop(window.pageYOffset);
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
	});

	return (
		<Container top={top}>
			<Wrapper top={top}>
				<Link to="/dashboard">
					<img src={logo} alt="Meetapp - Networking Infinite" />
				</Link>

				<Profile>
					<div>
						<strong>{profile.name}</strong>
						<Link to="/profile">MEU PERFIL</Link>
					</div>

					<button type="button" onClick={handleLogout}>
						<MdArrowBack color="#FFF" size={16} /> SAIR
					</button>
				</Profile>
			</Wrapper>
		</Container>
	);
}
