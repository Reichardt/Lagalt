import { Trash } from 'react-bootstrap-icons';

function ProfileSkill({ skill, checked, removeSkill }) {
	const handleDelete = () => {
		removeSkill(skill.id);
	};

	const renderSkillPara = () => {
		return <p className="mb-0 text-capitalize">{skill.name}</p>;
	};

	const renderSkillInput = () => {
		return (
			<div className="d-flex justify-content-between align-items-center">
				{renderSkillPara()}
				<Trash onClick={handleDelete} />
			</div>
		);
	};

	return (
		<div className="profile-skill p-3 mt-4 border border-light shadow-sm rounded">
			{checked ? renderSkillInput() : renderSkillPara()}
		</div>
	);
}

export default ProfileSkill;
