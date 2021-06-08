import React from 'react';
import ProfilePortfolioItem from './ProfilePortfolioItem';

function ProfilePortfolio() {
	return (
		<div className="profile-portfolio px-5">
			<h3 className="text-primary">Portfolio</h3>
			<hr />
			<div className="accordion" id="accordionExample">
				<ProfilePortfolioItem />
				<ProfilePortfolioItem />
				<ProfilePortfolioItem />
			</div>
		</div>
	);
}

export default ProfilePortfolio;
