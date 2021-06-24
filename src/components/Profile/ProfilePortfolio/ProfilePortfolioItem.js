import { useState } from 'react';
import { Trash } from 'react-bootstrap-icons';

function ProfilePortfolioItem({
	portfolioItem,
	profileParam,
	profile,
	handleUpdate,
	handleDelete,
}) {
	const [state, setState] = useState({
		checked: false,
		item: {
			id: portfolioItem.id,
			title: portfolioItem.title,
			body: portfolioItem.description,
		},
	});

	const handleChange = e => {
		setState({
			...state,
			item: {
				...state.item,
				[e.target.name]: e.target.value,
			},
		});
	};

	const handleSwitchChange = () => {
		setState({ ...state, checked: !state.checked });
		if (state.checked) {
			handleUpdate(state.item);
		}
	};

	const renderPortfolioEditableItem = () => {
		return (
			<div className="card">
				<div className="card-body">
					<label htmlFor="itemTitle">Title</label>
					<input
						className="form-control custom-input"
						value={state.item.title}
						onChange={handleChange}
						name="title"
					/>
					<div className="card-text mt-3">
						<label htmlFor="itemBody">Description</label>
						<textarea
							className="form-control custom-input"
							value={state.item.body}
							onChange={handleChange}
							name="body"
						/>
					</div>
				</div>
			</div>
		);
	};

	const renderPortfolioItem = () => {
		return (
			<div className="card mt-3">
				<div className="card-body">
					<h5 className="card-title">{state.item.title}</h5>
					<hr />
					<p className="card-text">{state.item.body}</p>
				</div>
			</div>
		);
	};

	return (
		<div className="col-lg-6">
			{profileParam && profile && profileParam.username === profile.username && (
				<div className="actions d-flex justify-content-between align-items-center mt-3">
					<div className="form-check form-switch">
						<label>Edit</label>
						<input
							className="form-check-input custom-input"
							type="checkbox"
							id="flexSwitchCheckChecked"
							checked={state.checked}
							onChange={handleSwitchChange}
						/>
					</div>
					{state.checked && (
						<Trash
							className="text-danger"
							onClick={() => handleDelete(state.item)}
						/>
					)}
				</div>
			)}
			{state.checked ? renderPortfolioEditableItem() : renderPortfolioItem()}
		</div>
	);
}

export default ProfilePortfolioItem;
