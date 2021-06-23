import { useState } from "react";
import ProfilePortfolioItem from "./ProfilePortfolioItem";
import ProfilePortfolioModal from "./ProfilePortfolioModal";
import { useDispatch } from "react-redux";
import { updateProfilePortfolioItems } from "../../../features/Profile/profileSlice";
import { useKeycloak } from "../../../context/KeycloakContext";

function ProfilePortfolio({ profile, profileParam }) {
    const { keyCloak } = useKeycloak();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        checked: false,
        portfolioItems: profileParam.userPortfolios,
        showModal: false,
    });

    const handleHide = () => setState({ ...state, showModal: false });
    const handleShow = () => setState({ ...state, showModal: true });

    const handleSwitchChange = () => {
        setState({
            ...state,
            checked: !state.checked,
        });

        if (state.checked) {
            const portfolioData = {
                userId: profileParam.id,
                portfolioItems: state.portfolioItems,
                token: keyCloak.token,
            };
            dispatch(updateProfilePortfolioItems(portfolioData));
        }
    };

    return (
        <>
            <div className='profile-portfolio px-5'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h2 className='text-primary'>Portfolio</h2>
                    {profileParam &&
                        profile &&
                        profileParam.username === profile.username && (
                            <button
                                className='btn btn-secondary'
                                onClick={handleShow}>
                                Add new portfolio item
                            </button>
                        )}
                </div>
                <hr />
                <div className='portfolio-items row'>
                    {state.portfolioItems ? (
                        state.portfolioItems.map((item) => (
                            <ProfilePortfolioItem portfolioItem={item} />
                        ))
                    ) : (
                        <p>There are no current portfolioitems</p>
                    )}
                </div>
            </div>
            {state.showModal && (
                <ProfilePortfolioModal
                    show={state.showModal}
                    handleHide={handleHide}
                    portfolioState={state}
                    handleState={setState}
                />
            )}
        </>
    );
}

export default ProfilePortfolio;
