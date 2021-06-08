import React from 'react';
import { NavLink } from 'react-router-dom';

function SidenavItem({ title, icon, link }) {
	const renderItemTitle = () => {
		if (title == 'notifications') {
			return (
				<>
					{title} <span className="badge bg-primary rounded-circle">0</span>
				</>
			);
		}
		return <>{title}</>;
	};
	return (
		<div className="mb-4 d-flex align-items-center icon-wrapper">
			<NavLink activeClassName="active" exact to={link}>
				{icon}
				<span className="ms-3">{renderItemTitle()}</span>
			</NavLink>
		</div>
	);
}

export default SidenavItem;
