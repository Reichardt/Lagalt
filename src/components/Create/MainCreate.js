import { useEffect } from 'react';
import { useKeycloak } from '../../context/KeycloakContext';

function MainCreate() {
	const { keyCloak } = useKeycloak();

	useEffect(() => {
		if (!keyCloak.authenticated) {
			keyCloak.login();
		}
	}, []);

	return (
		<div className="col-lg-9 col-lg-9 border-bottom border-start border-end border-secondary">
			<div className="bg-content border-bottom border-secondary d-flex justify-content-between text-darken p-3">
				<div className="d-flex align-items-center">
					<p className="fw-bold m-0 ms-2">Create a new project</p>
				</div>
			</div>
		</div>
	);
}

export default MainCreate;
