import ProjectReq from './ProjectReq';
import { Link } from 'react-router-dom';
import getTimeDiff from '../../../util/getTimeDiff';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProject } from '../../../features/Project/projectSlice';
import { fetchAllProgress } from '../../../features/Progress/progressSlice';
import projectImage from '../../../images/default_project.png';

function ProjectDetail({ projectprop, userProfile, token }) {
	const dispatch = useDispatch();

	const [state, setState] = useState({
		checked: false,
		project: {
			id: projectprop.id,
			title: projectprop.title,
			description: projectprop.description,
			imageURL: projectprop.imageURL ? projectprop.imageURL : projectImage,
			repoURL: projectprop.repoURL,
			progress: projectprop.progress,
		},
		progress: [],
	});

	useEffect(() => {
		dispatch(fetchAllProgress()).then(res => {
			setState({
				...state,
				progress: res.payload,
			});
		});
		// eslint-disable-next-line
	}, [dispatch]);

	const handleSwitchChange = () => {
		setState({
			...state,
			checked: !state.checked,
		});

		if (state.checked) {
			const projectData = {
				id: projectprop.id,
				project: {
					id: projectprop.id,
					title: state.project.title,
					description: state.project.description,
					imageURL: state.project.imageURL ? state.project.imageURL : '',
					repoURL: state.project.repoURL,
					progressId: state.project.progress.id,
					isActive: true,
				},
				token,
			};
			console.log(projectData);
			dispatch(updateProject(projectData));
		}
	};

	const handleChange = e => {
		setState({
			...state,
			project: {
				...state.project,
				[e.target.name]: e.target.value,
			},
		});
	};

	const handleSelectChange = e => {
		setState({
			...state,
			project: {
				...state.project,
				progress: state.progress
					.filter(prog => prog.id === Number(e.target.value))
					.map(prog => {
						return {
							name: prog.name,
							id: prog.id,
						};
					})[0],
			},
		});
	};
	return (
		<>
			<div className="col-lg-12 mb-3">
				<div className="px-3 d-flex justify-content-between align-items-center mb-3">
					{!state.checked ? (
						<h2 className="text-capitalize">{state.project.title}</h2>
					) : (
						<div className="d-flex flex-column">
							<label htmlFor="title" className="mb-2">
								Title
							</label>
							<input
								name="title"
								type="text"
								value={state.project.title}
								className="form-control custom-input"
								onChange={handleChange}
							/>
						</div>
					)}
					{userProfile &&
						projectprop &&
						userProfile.username === projectprop.creator && (
							<div className="form-check form-switch mt-3">
								<label>Edit project</label>
								<input
									className="form-check-input custom-input"
									type="checkbox"
									id="flexSwitchCheckChecked"
									checked={state.checked}
									onChange={handleSwitchChange}
								/>
							</div>
						)}
				</div>
			</div>
			<div className="col-lg-6 main-desc">
				<div className="px-3 d-flex justify-content-between flex-column">
					{!state.checked ? (
						<div className="project-img">
							<img src={state.project.imageURL} alt="profile" />
						</div>
					) : (
						<div className="d-flex flex-column mb-3">
							<label htmlFor="imageURL" className="mb-2">
								Image
							</label>
							<input
								className="form-control custom-input"
								type="text"
								value={state.project.imageURL}
								onChange={handleChange}
								name="imageURL"
							/>
						</div>
					)}
					{!state.checked ? (
						<p className="mt-5">{state.project.description}</p>
					) : (
						<div className="d-flex flex-column">
							<label htmlFor="description" className="mb-2">
								Description
							</label>
							<textarea
								name="description"
								type="text"
								value={state.project.description}
								onChange={handleChange}
								className="form-control custom-input"
							></textarea>
						</div>
					)}
				</div>
			</div>
			<div className="col-lg-6">
				<div className="p-3 project-details border-secondary border-start border-top border-bottom">
					<div className="d-flex justify-content-between align-items-center">
						<p className="require">Details</p>
						<small>{getTimeDiff(projectprop.createdAt)}</small>
					</div>
					<hr />
					<p className="repo-url mb-2">
						Url:
						{!state.checked ? (
							<Link
								to={{ pathname: state.project.repoURL }}
								className="ms-1"
								target="_blank"
							>
								{state.project.repoURL}
							</Link>
						) : (
							<input
								type="text"
								name="repoURL"
								className="form-control custom-input"
								value={state.project.repoURL}
								onChange={handleChange}
							/>
						)}
					</p>
					<p className="mb-0">
						Status:{' '}
						{!state.checked ? (
							state.project.progress.name
						) : (
							<select
								value={state.project.progress.id}
								className="form-control custom-input"
								name="progressId"
								onChange={handleSelectChange}
							>
								{state.progress.map(prog => (
									<option value={prog.id}>{prog.name}</option>
								))}
							</select>
						)}
					</p>
					<div className="mt-3 required">
						<p className="mb-2 intro">We're currently looking for</p>
						<ul>
							{projectprop.skills.map((skill, index) => (
								<ProjectReq skill={skill} key={index} />
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProjectDetail;
