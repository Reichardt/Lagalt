import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchAllCategories,
	projectSelector,
} from '../../features/Project/projectSlice';
import CategoryItem from './CategoryItem';

function CategoriesMain() {
	const dispatch = useDispatch();
	const { categories } = useSelector(projectSelector);
	useEffect(() => {
		dispatch(fetchAllCategories());
	}, [dispatch]);

	return (
		<div className="col-lg-6 categories">
			<div className="bg-content border-start border-end border-secondary text-darken p-3">
				<p className="fw-bold m-0">Categories</p>
			</div>
			<div className="d-grid four-column full-height">
				{categories.map(category => (
					<CategoryItem category={category} key={category.id} />
				))}
			</div>
		</div>
	);
}

export default CategoriesMain;
