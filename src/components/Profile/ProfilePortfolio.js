import { useState } from "react";
import ProfilePortfolioItem from "./ProfilePortfolioItem";

function ProfilePortfolio({ profile, profileParam }) {
    const [checked, setChecked] = useState(false);

    const handleSwitchChange = () => {
        setChecked(!checked);
    };

    return (
        <div className='profile-portfolio px-5'>
            <div className='d-flex justify-content-between align-items-center pe-3'>
                <h2 className='text-primary'>Portfolio</h2>
                {profileParam &&
                    profile &&
                    profileParam.username === profile.username && (
                        <div className='form-check form-switch'>
                            <label>Edit portfolio</label>
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
            <hr />
            <div className='accordion' id='accordionExample'>
                <ProfilePortfolioItem
                    checked={checked}
                    title={"PortfolioItem 1"}
                    body={"I am the body"}
                />
                <ProfilePortfolioItem
                    checked={checked}
                    title={"PortfolioItem 2"}
                    body={"I am the body"}
                />
                <ProfilePortfolioItem
                    checked={checked}
                    title={"PortfolioItem 3"}
                    body={"I am the body"}
                />
            </div>
        </div>
    );
}

export default ProfilePortfolio;
