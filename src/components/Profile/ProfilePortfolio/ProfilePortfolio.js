import { useState } from 'react';
import ProfilePortfolioItem from './ProfilePortfolioItem';
import ProfilePortfolioModal from './ProfilePortfolioModal';
import { useKeycloak } from '../../../context/KeycloakContext';
import {
	deleteProfilePortfolioItem,
	updateProfilePortfolioItem,
} from '../../../features/Profile/profileSlice';
import { useDispatch } from 'react-redux';

function ProfilePortfolio({ profile, profileParam }) {
	const { keyCloak } = useKeycloak();
	const dispatch = useDispatch();

	const [state, setState] = useState({
		portfolioItems: profileParam.userPortfolios,
		showModal: false,
	});

	const handleHide = () => setState({ ...state, showModal: false });
	const handleShow = () => setState({ ...state, showModal: true });

	const handleDelete = item => {
		const updatedItems = state.portfolioItems.filter(
			pitem => pitem.id !== item.id
		);
		setState({
			...state,
			portfolioItems: updatedItems,
		});
		const portfolioData = {
			itemId: item.id,
			userId: profile.id,
			token: keyCloak.token,
		};
		dispatch(deleteProfilePortfolioItem(portfolioData));
	};

	const handleUpdate = item => {
		const itemIdx = state.portfolioItems.findIndex(
			pitem => pitem.id === item.id
		);
		const arrayClone = [...state.portfolioItems];
		arrayClone[itemIdx] = {
			...arrayClone[itemIdx],
			title: item.title,
			description: item.body,
		};
		setState({
			...state,
			portfolioItems: arrayClone,
		});
		const portfolioData = {
			portfolioItem: {
				id: item.id,
				title: item.title,
				description: item.body,
			},
			itemId: item.id,
			token: keyCloak.token,
			userId: profile.id,
		};
		dispatch(updateProfilePortfolioItem(portfolioData));
	};

	return (
		<>
			<div className="profile-portfolio px-5">
				<div className="d-flex justify-content-between align-items-center">
					<h2 className="text-primary">Portfolio</h2>
					{profileParam &&
						profile &&
						profileParam.username === profile.username && (
							<button className="btn btn-secondary" onClick={handleShow}>
								Add new portfolio item
							</button>
						)}
				</div>
				<hr />
				<div className="portfolio-items row">
					{state.portfolioItems.length ? (
						state.portfolioItems.map(item => (
							<ProfilePortfolioItem
								portfolioItem={item}
								profileParam={profileParam}
								profile={profile}
								handleDelete={handleDelete}
								handleUpdate={handleUpdate}
								key={item.id}
							/>
						))
					) : (
						<p>There are no current portfolioitems</p>
					)}
				</div>
			</div>
			{state.showModal && (
				<ProfilePortfolioModal
					show={state.showModal}
					handleHide={handleHide}
					portfolioState={state}
					handleState={setState}
					profile={profile}
					token={keyCloak.token}
				/>
			)}
		</>
	);
}

export default ProfilePortfolio;
