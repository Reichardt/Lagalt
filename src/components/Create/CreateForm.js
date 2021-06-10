import { useState } from "react";

function CreateForm() {
    const [state, setState] = useState({
        title: "",
        description: "",
        repoUrl: "",
        imgUrl: "",
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form>
            <div className='row mt-3 ps-5 pe-5'>
                <div className='col-lg-12'>
                    <div className='mb-3'>
                        <label htmlFor='title' className='form-label'>
                            Title
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            name='title'
                            onChange={handleChange}
                            value={state.title}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='description' className='form-label'>
                            Description
                        </label>
                        <textarea
                            className='form-control'
                            name='description'
                            onChange={handleChange}
                            value={state.description}></textarea>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='repoUrl' className='form-label'>
                            Repository URL
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            name='repoUrl'
                            onChange={handleChange}
                            value={state.repoUrl}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='imgUrl' className='form-label'>
                            Image URL
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            name='imgUrl'
                            onChange={handleChange}
                            value={state.imgUrl}
                        />
                    </div>
                    <button className='btn btn-primary my-5'>
                        Post project
                    </button>
                </div>
            </div>
        </form>
    );
}

export default CreateForm;
