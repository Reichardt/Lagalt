import { useState } from "react";
import ProfileImage from "./ProfileImage";
import profileImage from "../../../images/default_profile.png";
import { useKeycloak } from "../../../context/KeycloakContext";
import { updateProfileDesc } from "../../../features/Profile/profileSlice";
import { useDispatch } from "react-redux";

function ProfileDesc({ profile, profileParam }) {
    const dispatch = useDispatch();
    const { keyCloak } = useKeycloak();
    const [checked, setChecked] = useState(false);
    const [state, setState] = useState({
        description: profileParam.description ? profileParam.description : "",
        imageUrl: profileParam.imageUrl ? profileParam.imageUrl : profileImage,
    });

    const handleSwitchChange = () => {
        setChecked(!checked);
        if (checked) {
            const profileData = {
                updatedProfile: {
                    ...profile,
                    description: state.description,
                    imageUrl: state.imageUrl,
                },
                token: keyCloak.token,
            };

            dispatch(updateProfileDesc(profileData));
        }
    };

    const renderTextDesc = () => {
        return <p>{profileParam && state.description}</p>;
    };

    const renderTextArea = () => {
        return (
            <>
                <p>Description</p>
                <textarea
                    className='form-control custom-input'
                    value={state.description}
                    onChange={(e) =>
                        setState({ ...state, description: e.target.value })
                    }
                />
            </>
        );
    };

    return (
        <>
            <ProfileImage checked={checked} setState={setState} state={state} />
            <div className='profile-desc ps-5 py-5 text-start'>
                {checked ? renderTextArea() : renderTextDesc()}
                {profileParam &&
                    profile &&
                    profileParam.username === profile.username && (
                        <div className='form-check form-switch mt-3'>
                            <label>Edit description</label>
                            <input
                                className='form-check-input custom-input'
                                type='checkbox'
                                id='flexSwitchCheckChecked'
                                checked={checked}
                                onChange={handleSwitchChange}
                            />
                        </div>
                    )}
            </div>
        </>
    );
}

export default ProfileDesc;
