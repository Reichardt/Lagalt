import { useState, useEffect } from 'react';
import ProjectSkill from './ProjectSkill';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSkills, skillSelector } from '../../features/Skill/skillSlice';
import { addNewProject } from '../../features/Project/projectSlice';
import { useKeycloak } from '../../context/KeycloakContext';
import { useHistory } from 'react-router-dom';

function CreateForm({ progress }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { loading } = useSelector(skillSelector);
	const { keyCloak } = useKeycloak();

	const [state, setState] = useState({
		title: '',
		description: '',
		repoUrl: '',
		imgUrl: '',
		progress: null,
		skillOptions: null,
		addedSkills: [],
		chosenSkill: null,
	});

	useEffect(() => {
		dispatch(fetchAllSkills()).then(res => {
			setState({
				...state,
				skillOptions: res.payload,
			});
		});

		return () => {
			setState({ ...state });
		};
	}, [dispatch]);

	const handleChange = e => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const handleSkillChange = e => {
		const selectedSkill = state.skillOptions.find(
			skill => skill.id === Number(e.target.value)
		);
		setState({
			...state,
			chosenSkill: e.target.value !== '0' ? selectedSkill : null,
		});
	};

	const handleAmountChange = (reqAmount, id) => {
		const idToUpdate = state.addedSkills.findIndex(skill => skill.id === id);
		let newArray = [...state.addedSkills];
		newArray[idToUpdate] = {
			...newArray[idToUpdate],
			requiredCount: reqAmount,
		};
		setState({
			...state,
			addedSkills: newArray,
		});
	};

	const addNewSkill = e => {
		e.preventDefault();

		if (state.chosenSkill) {
			setState({
				...state,
				addedSkills: [
					...state.addedSkills,
					{
						...state.chosenSkill,
						requiredCount: 1,
					},
				],
				skillOptions: state.skillOptions.filter(
					option => !option.name.includes(state.chosenSkill.name)
				),
				chosenSkill: null,
			});
		}
	};

	const removeSkill = idToRemove => {
		const skill = state.addedSkills.filter(skill => skill.id === idToRemove);
		setState({
			...state,
			addedSkills: state.addedSkills.filter(skill => skill.id !== idToRemove),
			skillOptions: [...state.skillOptions, skill[0]],
		});
	};

	const handleProjectAdd = e => {
		e.preventDefault();

		const skills = state.addedSkills.map(skill => {
			return {
				skillId: skill.id,
				requiredCount: skill.requiredCount,
			};
		});

		const projectData = {
			project: {
				title: state.title,
				description: state.description,
				repoUrl: state.repoUrl,
				progressId: Number(state.progress),
				skills,
			},
			token: keyCloak.token,
		};

		dispatch(addNewProject(projectData)).then(res => {
			history.push(`/project/${res.payload.id}`);
		});
	};

	return (
		<form onSubmit={handleProjectAdd}>
			<div className="row mt-3 ps-5 pe-5">
				<div className="col-lg-12">
					<div className="mb-3">
						<label htmlFor="title" className="form-label">
							Title
						</label>
						<input
							type="text"
							className="form-control custom-input"
							name="title"
							onChange={handleChange}
							value={state.title}
							placeholder="A fancy title.."
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="description" className="form-label">
							Description
						</label>
						<textarea
							className="form-control custom-input"
							name="description"
							onChange={handleChange}
							value={state.description}
							placeholder="Write something interesting.."
						></textarea>
					</div>

					<div className="mb-3">
						<label htmlFor="repoUrl" className="form-label">
							Repository URL
						</label>
						<input
							type="text"
							className="form-control custom-input"
							name="repoUrl"
							onChange={handleChange}
							value={state.repoUrl}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="imgUrl" className="form-label">
							Image URL
						</label>
						<input
							type="text"
							className="form-control custom-input"
							name="imgUrl"
							onChange={handleChange}
							value={state.imgUrl}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="progress" className="form-label">
							Progress
						</label>
						<select
							onChange={handleChange}
							name="progress"
							className="form-select custom-input"
						>
							<option value="0">Choose progress</option>
							{progress.map(prog => (
								<option value={prog.id} key={prog.id}>
									{prog.name}
								</option>
							))}
						</select>
					</div>
					<div className="mb-3">
						<label htmlFor="skills" className="form-label">
							Skills needed
						</label>
						<div className="d-flex justify-content-between align-items-center">
							<select
								className="form-select skills-select custom-input"
								aria-label="Default select example"
								onChange={handleSkillChange}
								value={state.chosenSkill ? state.chosenSkill.id : '0'}
							>
								<option value="0">Choose skill</option>
								{!loading &&
									state.skillOptions &&
									state.skillOptions.map((option, index) => (
										<option
											key={`${option}-${index}`}
											data-name={option.name}
											value={option.id}
										>
											{option.name}
										</option>
									))}
							</select>
							<button
								className="btn btn-primary"
								disabled={!state.chosenSkill}
								onClick={addNewSkill}
							>
								Add skill
							</button>
						</div>
					</div>
					{state.addedSkills.map((skill, index) => (
						<ProjectSkill
							skill={skill}
							handleAmountChange={handleAmountChange}
							removeSkill={removeSkill}
							key={index}
						/>
					))}
					<button className="btn btn-primary my-5" onClick={handleProjectAdd}>
						Post project
					</button>
				</div>
			</div>
		</form>
	);
}

export default CreateForm;
