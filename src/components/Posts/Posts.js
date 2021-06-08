import React from "react";
import PostItem from "./PostItem";

function Posts({ posts }) {
    return (
        <div className='d-flex flex-column'>
            <div className='posts bg-content'>
                {posts.map((post) => (
                    <PostItem post={post} key={post.id} />
                ))}
            </div>
        </div>
    );
}

export default Posts;
