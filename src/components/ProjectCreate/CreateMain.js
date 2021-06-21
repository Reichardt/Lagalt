import { useEffect } from 'react';
import { useKeycloak } from '../../context/KeycloakContext';
import CreateForm from './CreateForm';
import {
	progressSelector,
	fetchAllProgress,
} from '../../features/Progress/progressSlice';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Global/Loader';

function CreateMain() {
	const { keyCloak } = useKeycloak();
	const { progress, loading } = useSelector(progressSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!keyCloak.authenticated) {
			keyCloak.login();
		} else {
			dispatch(fetchAllProgress());
		}
	}, [dispatch, keyCloak]);

	return (
		<>
			{loading && <Loader />}
			{!loading && progress && (
				<div className="col-lg-9 bg-content border-bottom border-start border-end border-secondary project-create">
					<div className="border-bottom border-secondary d-flex justify-content-between text-darken p-3">
						<div className="d-flex align-items-center">
							<p className="fw-bold m-0 ms-2">Create a new project</p>
						</div>
					</div>
					<CreateForm progress={progress} />
				</div>
			)}
		</>
	);
}

export default CreateMain;
