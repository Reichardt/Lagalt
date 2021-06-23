import React from "react";

function ProfileImage({ checked, setState, state }) {
    return (
        <>
            {checked ? (
                <div className='ps-5 text-start desc-image'>
                    <p>Image url</p>
                    <input
                        className='form-control custom-input'
                        onChange={(e) =>
                            setState({ ...state, imageUrl: e.target.value })
                        }
                        value={state.imageUrl}
                    />
                </div>
            ) : (
                <div className='profile-img'>
                    <img
                        className='rounded-circle'
                        src={state.imageUrl}
                        alt='profile'
                    />
                </div>
            )}
        </>
    );
}

export default ProfileImage;
