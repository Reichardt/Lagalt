import { useEffect, useState } from 'react';
import {
	fetchProjectById,
	projectSelector,
} from '../../features/Project/projectSlice';
import { profileSelector } from '../../features/Profile/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useKeycloak } from '../../context/KeycloakContext';
import Loader from '../Global/Loader';
import ProjectSkill from '../ProjectList/ProjectSkill';
import { PeopleFill } from 'react-bootstrap-icons';
import ProjectBoard from './ProjectBoard';
import ProjectDetail from './ProjectDetail';
import ProjectAppModal from './ProjectAppModal';
import Back from '../Global/Back';

function ProjectMain({ id }) {
	const { Login } = useKeycloak();
	const { project, loading } = useSelector(projectSelector);
	const { userProfile } = useSelector(profileSelector);
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();

	const handleShow = () => {
		if (!userProfile) {
			Login();
		} else {
			setShowModal(true);
		}
	};

	const handleHide = () => {
		setShowModal(false);
	};

	useEffect(() => {
		dispatch(fetchProjectById(id));
	}, [dispatch, id]);

	return (
		<>
			{loading && <Loader />}
			{!loading && project && (
				<>
					<div className="col-lg-9 bg-content border-bottom border-start border-end border-secondary project">
						<div className="border-bottom border-secondary d-flex justify-content-between align-items-center text-darken p-3">
							<div className="d-flex align-items-center">
								<Back />
								<p className="fw-bold ms-3 m-0">{project.title}</p>
							</div>
							<div className="d-flex align-items-center">
								<p className="mb-0 me-3">{project.progress}</p>
								<button className="btn btn-primary" onClick={handleShow}>
									Apply to project
								</button>
							</div>
						</div>
						<div className="p-3 d-flex justify-content-between align-items-center">
							<div>
								{project.skills.map((skill, index) => (
									<ProjectSkill skill={skill} key={index} />
								))}
							</div>
							<div className="d-flex align-items-center border border-secondary p-1 pe-2 ps-2 rounded">
								<p className="mb-0 me-2">
									{project.current} / {project.total}
								</p>
								<PeopleFill />
							</div>
						</div>
						<div className="row mt-4">
							<ProjectDetail project={project} />
						</div>
						<div className="row mt-4">
							<ProjectBoard />
						</div>
					</div>
					{showModal && (
						<ProjectAppModal
							show={showModal}
							handleHide={handleHide}
							project={project}
						/>
					)}
				</>
			)}
		</>
	);
}

export default ProjectMain;
