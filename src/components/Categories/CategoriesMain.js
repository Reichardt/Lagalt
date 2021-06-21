import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { skillSelector, fetchAllSkills } from '../../features/Skill/skillSlice';
import CategoryItem from './CategoryItem';

function CategoriesMain() {
	const dispatch = useDispatch();
	const { skills, loading } = useSelector(skillSelector);
	useEffect(() => {
		dispatch(fetchAllSkills());
	}, [dispatch]);

	return (
		<div className="col-lg-6 categories">
			<div className="bg-content border-start border-end border-secondary text-darken p-3">
				<p className="fw-bold m-0">Categories</p>
			</div>
			<div className="d-grid four-column full-height">
				{!loading &&
					skills.map(category => (
						<CategoryItem category={category} key={category.id} />
					))}
			</div>
		</div>
	);
}

export default CategoriesMain;
