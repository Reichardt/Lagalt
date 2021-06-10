import { useState } from "react";
import ProfileSkill from "./ProfileSkill";
import uniqid from "uniqid";

function ProfileSkills({ profile, profileParam }) {
    const [state, setState] = useState({
        checked: false,
    });

    const [skills, setSkills] = useState([
        {
            id: uniqid(),
            title: "Web development",
        },
    ]);

    const handleSwitchChange = () => {
        setState({
            ...state,
            checked: !state.checked,
        });
        if (state.checked) {
            setSkills(skills.filter((skill) => skill.hasOwnProperty("title")));
        }
    };

    const addNewSkill = () => {
        setSkills([
            ...skills,
            {
                id: uniqid(),
            },
        ]);
    };

    const removeSkill = (idToRemove) => {
        setSkills(skills.filter((skill) => skill.id !== idToRemove));
    };

    const handleSkillChange = (e, id) => {
        setSkills(
            skills.map((skill) =>
                skill.id === id ? { ...skill, title: e.target.value } : skill
            )
        );
    };

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center pe-3'>
                <h2 className='text-primary'>Skills</h2>
                {profile && profileParam === profile.username && (
                    <div className='form-check form-switch'>
                        <label>Edit skills</label>
                        <input
                            className='form-check-input '
                            type='checkbox'
                            checked={state.checked}
                            onChange={handleSwitchChange}
                        />
                    </div>
                )}
            </div>
            <hr />
            {skills.map((skill) => (
                <ProfileSkill
                    skill={skill}
                    checked={state.checked}
                    removeSkill={removeSkill}
                    handleSkillChange={handleSkillChange}
                    key={uniqid()}
                />
            ))}
            {state.checked && (
                <button className='btn btn-primary mt-4' onClick={addNewSkill}>
                    Add skill
                </button>
            )}
        </div>
    );
}

export default ProfileSkills;
