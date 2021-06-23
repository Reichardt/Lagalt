import { useState, useEffect } from "react";
import ProjectComment from "./ProjectComment";
import ProjectCommentForm from "./ProjectCommentForm";

function ProjectBoard({ profile, messages, project }) {
    const [state, setState] = useState({
        showForm: false,
        showMessageForm: false,
        comments: [],
        replies: [],
        selectedComment: null,
    });

    useEffect(() => {
        setState({
            ...state,
            comments:
                messages &&
                messages.filter((message) => message.messageId === null),
            replies:
                messages &&
                messages.filter((message) => message.messageId !== null),
        });
    }, [messages]);

    const handleCommentAdd = (comment) => {
        if (comment.messageId) {
            setState({
                ...state,
                replies: [
                    ...state.replies,
                    {
                        ...comment,
                        user: {
                            id: profile.id,
                            username: profile.name,
                        },
                    },
                ],
            });
        } else {
            setState({
                ...state,
                comments: [
                    ...state.comments,
                    {
                        ...comment,
                        user: {
                            id: profile.id,
                            username: profile.name,
                        },
                    },
                ],
            });
        }
    };

    const handleHide = () => setState({ ...state, showForm: false });
    const handleMessageShow = () =>
        setState({ ...state, showMessageForm: true });
    const handleMessageHide = () =>
        setState({ ...state, showMessageForm: false });

    return (
        <div className='col-lg-12 mt-3'>
            <div className='px-3'>
                <div className='mb-3 d-flex justify-content-between align-items-center'>
                    <h5 className='mb-0'>Message Board</h5>
                    {profile && (
                        <button
                            className='btn btn-secondary'
                            onClick={handleMessageShow}>
                            New message
                        </button>
                    )}
                </div>
                <div className='comments border-top'>
                    {state.comments && state.comments.length ? (
                        state.comments.map((comment) => (
                            <ProjectComment
                                comment={comment}
                                setSelectedComment={setState}
                                boardState={state}
                                allReplies={state.replies}
                                profile={profile}
                            />
                        ))
                    ) : (
                        <p className='full-height d-flex justify-content-center align-items-center py-5'>
                            There are no messages at the moment
                        </p>
                    )}
                </div>
                {state.showForm && (
                    <ProjectCommentForm
                        handleHide={handleHide}
                        selectedComment={state.selectedComment}
                        project={project}
                        handleCommentAdd={handleCommentAdd}
                    />
                )}
                {state.showMessageForm && (
                    <ProjectCommentForm
                        handleHide={handleMessageHide}
                        project={project}
                        handleCommentAdd={handleCommentAdd}
                    />
                )}
            </div>
        </div>
    );
}

export default ProjectBoard;
