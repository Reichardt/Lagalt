import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProfilePortfolioItem } from '../../../features/Profile/profileSlice';
import { Modal } from 'react-bootstrap';

function ProfilePortfolioModal({
	show,
	handleHide,
	portfolioState,
	handleState,
	profile,
	token,
}) {
	const dispatch = useDispatch();

	const [state, setState] = useState({
		title: '',
		description: '',
	});

	const handleSubmit = e => {
		e.preventDefault();

		const portfolioItem = {
			title: state.title,
			description: state.description,
		};

		const portfolioData = {
			portfolioItem: {
				title: portfolioItem.title,
				description: portfolioItem.description,
				userId: profile.id,
			},
			userId: profile.id,
			token,
		};

		dispatch(addProfilePortfolioItem(portfolioData)).then(res => {
			const portfolioItem = res.payload;
			handleState({
				...portfolioState,
				portfolioItems: [...portfolioState.portfolioItems, portfolioItem],
				showModal: false,
			});
		});
	};
	return (
		<Modal show={show} onHide={handleHide} className="application-list-modal">
			<Modal.Header>
				<Modal.Title>New portfolio item</Modal.Title>
			</Modal.Header>
			<form onSubmit={handleSubmit}>
				<Modal.Body>
					<div className="mb-3">
						<label htmlFor="title" className="form-label">
							Title
						</label>
						<input
							name="title"
							type="text"
							value={state.title}
							onChange={e => setState({ ...state, title: e.target.value })}
							className="form-control custom-input"
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="desc" className="form-label">
							Description
						</label>
						<textarea
							name="desc"
							type="text"
							value={state.description}
							onChange={e =>
								setState({
									...state,
									description: e.target.value,
								})
							}
							className="form-control custom-input"
						></textarea>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<button className="btn btn-primary">Add item</button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default ProfilePortfolioModal;
