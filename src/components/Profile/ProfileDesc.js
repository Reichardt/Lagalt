import { useState } from "react";

function ProfileDesc({ profile, profileParam }) {
    const [checked, setChecked] = useState(false);

    const handleSwitchChange = () => {
        setChecked(!checked);
    };

    const renderTextDesc = () => {
        return (
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        );
    };

    const renderTextArea = () => {
        return (
            <textarea
                className='form-control'
                defaultValue='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
	veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
	commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
	velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
	occaecat cupidatat non proident, sunt in culpa qui officia deserunt
	mollit anim id est laborum.'
            />
        );
    };

    return (
        <div className='profile-desc ps-5 py-5 text-start'>
            {checked ? renderTextArea() : renderTextDesc()}
            {profile && profileParam === profile.username && (
                <div className='form-check form-switch'>
                    <label>Edit description</label>
                    <input
                        className='form-check-input '
                        type='checkbox'
                        id='flexSwitchCheckChecked'
                        checked={checked}
                        onChange={handleSwitchChange}
                    />
                </div>
            )}
        </div>
    );
}

export default ProfileDesc;
