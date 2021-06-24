import { NavLink } from 'react-router-dom';

function SidenavItem({ title, icon, link, projects }) {
	return (
		<div className="d-flex align-items-center icon-wrapper mb-4">
			<NavLink
				activeClassName="active"
				className="d-flex align-items-center"
				exact
				to={link}
			>
				{icon}
				<span className="ms-2 d-flex">
					{title}{' '}
					{projects && (
						<span className="badge bg-primary rounded-circle ms-2 align-self-baseline">
							{projects.length}
						</span>
					)}
				</span>
			</NavLink>
		</div>
	);
}

export default SidenavItem;
