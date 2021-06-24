import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { profileSelector } from '../../features/Profile/profileSlice';
import { useState, useEffect } from 'react';

function ProjectSkill({ skill }) {
	const { userProfile } = useSelector(profileSelector);
	const [userSkill, setUserSkill] = useState(false);
	const history = useHistory();

	const handleSkillClick = e => {
		e.stopPropagation();
		history.push(`/category/${skill.skillName}`);
	};

	useEffect(() => {
		if (userProfile) {
			setUserSkill(
				userProfile.skills.find(uskill => uskill.name === skill.skillName)
			);
		}
	}, [userProfile]);

	return (
		<>
			<span
				className={`badge rounded-pill me-2 text-capitalize skill ${
					userSkill ? 'bg-primary active' : 'bg-custom'
				}`}
			>
				<span className="me-1" onClick={handleSkillClick}>
					{skill.skillName}
				</span>
				<span>
					({skill.foundCount} / {skill.requiredCount})
				</span>
			</span>
		</>
	);
}

export default ProjectSkill;
