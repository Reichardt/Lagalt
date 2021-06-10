import { useState } from "react";

function ProfileSkill({ skill, checked, removeSkill, handleSkillChange }) {
    const [options, setOptions] = useState([
        "Web development",
        "Music",
        "Game development",
    ]);

    const handleDelete = () => {
        removeSkill(skill.id);
    };

    const renderSkillPara = () => {
        return <p className='mb-0'>{skill.title}</p>;
    };

    const renderSkillInput = () => {
        return (
            <div className='d-flex justify-content-between align-items-center'>
                <select
                    className='form-select'
                    aria-label='Default select example'
                    onChange={(e) => handleSkillChange(e, skill.id)}
                    value={skill.title}>
                    <option>Choose skill</option>
                    {options.map((option, index) => (
                        <option key={`${option}-${index}`} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <button className='btn btn-primary' onClick={handleDelete}>
                    Delete skill
                </button>
            </div>
        );
    };

    return (
        <div className='profile-skill p-3 mt-4 border border-light shadow-sm rounded'>
            {checked ? renderSkillInput() : renderSkillPara()}
        </div>
    );
}

export default ProfileSkill;
