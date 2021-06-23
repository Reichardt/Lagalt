import { ReplyFill } from "react-bootstrap-icons";
import getTimeDiff from "../../../util/getTimeDiff";
import { useEffect, useState } from "react";

function ProjectComment({
    comment,
    setSelectedComment,
    boardState,
    allReplies,
    profile,
}) {
    const [replies, setReplies] = useState([]);
    const handleReplyClick = () => {
        setSelectedComment({
            ...boardState,
            showForm: true,
            selectedComment: comment,
        });
    };

    useEffect(() => {
        setReplies(
            allReplies.filter((reply) => reply.messageId === comment.id)
        );
    }, [allReplies]);

    return (
        <div className='comment ps-3'>
            <div className='comment-wrapper p-3 border-secondary border'>
                <div className='comment-heading'>
                    <div className='comment-info'>
                        <a href='/' className='comment-author text-capitalize'>
                            {comment.user.username}
                        </a>
                        <p className='m-0'>{getTimeDiff(comment.createdAt)}</p>
                    </div>
                </div>
                <div className='comment-body'>
                    <p>{comment.text}</p>
                    {profile && (
                        <div className='reply mt-2 ' onClick={handleReplyClick}>
                            <ReplyFill />
                            <small>Reply</small>
                        </div>
                    )}
                </div>
            </div>
            <div className='replies border-secondary border-start'>
                {replies &&
                    replies.map((reply) => (
                        <ProjectComment
                            comment={reply}
                            setSelectedComment={setSelectedComment}
                            boardState={boardState}
                            allReplies={allReplies}
                            profile={profile}
                            key={reply.id}
                        />
                    ))}
            </div>
        </div>
    );
}

export default ProjectComment;
