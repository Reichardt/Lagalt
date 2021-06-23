import { XCircleFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../../../features/Project/projectSlice";
import { useKeycloak } from "../../../context/KeycloakContext";

function ProjectReplyForm({ handleHide, selectedComment, project }) {
    const [message, setMessage] = useState("");
    const { keyCloak } = useKeycloak();
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, document.documentElement.scrollHeight);
    }, []);

    const handleMessageAdd = () => {
        const messageData = {
            id: project.id,
            message: {
                text: message,
                messageId: selectedComment ? selectedComment.id : null,
            },
            token: keyCloak.token,
        };

        dispatch(addMessage(messageData));
    };

    return (
        <div className='mt-3 pe-4 reply-form mb-3'>
            <hr />
            <div className='d-flex justify-content-between'>
                <label className='mb-2'>
                    {selectedComment && (
                        <>
                            <span>Reply to</span>
                            <span className='text-capitalize'>
                                {selectedComment.user.username}
                            </span>
                        </>
                    )}
                    {!selectedComment && (
                        <>
                            <span>Add a new message</span>
                        </>
                    )}
                </label>
                <XCircleFill onClick={handleHide} />
            </div>
            <textarea
                type='text'
                name='reply'
                className='form-control'
                value={message}
                onChange={(e) => setMessage(e.target.value)}></textarea>
            <button className='btn btn-primary mt-2' onClick={handleMessageAdd}>
                Reply
            </button>
        </div>
    );
}

export default ProjectReplyForm;
