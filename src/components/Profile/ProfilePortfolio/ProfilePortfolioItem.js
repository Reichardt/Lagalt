import { useState } from "react";

function ProfilePortfolioItem({ checked, portfolioItem }) {
    const [state, setState] = useState({
        itemTitle: portfolioItem.title,
        itemBody: portfolioItem.description,
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleDelete = () => {
        console.log("Deleting");
    };

    const renderPortfolioEditableItem = () => {
        return (
            <div className='card'>
                <div className='card-body'>
                    <h5 className='card-title'>Card title</h5>
                    <input
                        className='form-control custom-input'
                        value={state.itemTitle}
                    />
                    <p className='card-text'>
                        <textarea
                            className='form-control custom-input'
                            value={state.itemBody}
                        />
                    </p>
                </div>
            </div>
        );
    };

    const renderPortfolioItem = () => {
        return (
            <div className='card mt-3'>
                <div className='card-body'>
                    <h5 className='card-title'>{state.itemTitle}</h5>
                    <hr />
                    <p className='card-text'>{state.itemBody}</p>
                </div>
            </div>
        );
    };

    return (
        <div className='col-lg-6'>
            {checked ? renderPortfolioEditableItem() : renderPortfolioItem()}
        </div>
    );
}

export default ProfilePortfolioItem;
