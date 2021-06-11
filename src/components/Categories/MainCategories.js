import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchAllCategories,
	projectSelector,
} from '../../features/Project/projectSlice';
import CategoryItem from './CategoryItem';

function MainCategories() {
	const dispatch = useDispatch();
	const { categories } = useSelector(projectSelector);
	useEffect(() => {
		dispatch(fetchAllCategories());
	}, []);
	return (
		<div className="col-lg-6">
			<div className="bg-content border-bottom border-start border-end border-secondary text-darken p-3">
				<p className="fw-bold m-0">Categories</p>
			</div>
			{categories.map(category => (
				<CategoryItem category={category} key={category.id} />
			))}
		</div>
	);
}

export default MainCategories;
