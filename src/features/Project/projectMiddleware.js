import { setProjects, setProjectError } from './projectSlice';
import ProjectsAPI from '../../data/ProjectsAPI';

export const projectMiddleware =
	({ dispatch }) =>
	next =>
	action => {
		const result = next(action);
		if (action.type === 'project/fetchProjects') {
			ProjectsAPI.getProjects()
				.then(projects => {
					dispatch(setProjects(projects));
				})
				.catch(error => {
					dispatch(setProjectError());
				});
		}

		return result;
	};
