import React from 'react';
import { useHistory } from 'react-router-dom';

function PostItem({ post }) {
	const history = useHistory();

	const handlePostClick = () => {
		history.push('/post/' + post.id);
	};

	const handleLinkClick = e => {
		e.stopPropagation();
		history.push('/profile/chefen');
	};
	return (
		<div
			onClick={handlePostClick}
			className="bg-content border post-item border-secondary text-darken p-3"
		>
			<div className="d-flex justify-content-between align-items-center mb-2">
				<div>
					<span className="category me-2">Web development</span>
					<span className="badge rounded-pill bg-primary text-white">
						Primary
					</span>
				</div>
				<span className="members">0 / 4</span>
			</div>
			<p>{post.title}</p>
			<div className="text-end">
				<small>
					Posted by{' '}
					<span className="link" onClick={handleLinkClick}>
						Nikolaj
					</span>
				</small>
			</div>
		</div>
	);
}

export default PostItem;
