import React from 'react';
import Search from '../Search/Search';
import SidenavAuth from './SidenavAuth';
import SidenavItem from './SidenavItem';
import SidenavLogo from './SidenavLogo';
import { HouseDoorFill, ListTask } from 'react-bootstrap-icons';
import SideRecent from './SideRecent';

function Sidenav({ side }) {
	const renderLeftSide = () => {
		return (
			<div className="left-nav col-lg-2 offset-lg-1 border-dark text-darken">
				<SidenavLogo />
				<div className="sticky-top align-self-start pt-3">
					<SidenavItem title={'home'} icon={<HouseDoorFill />} link={'/'} />
					<SidenavItem
						title={'categories'}
						icon={<ListTask />}
						link={'/categories'}
					/>
					<SidenavAuth />
				</div>
			</div>
		);
	};

	const renderRightSide = () => {
		return (
			<div className="border-dark col-lg-3 text-darken sticky-top align-self-start pt-4">
				<Search />
				<SideRecent />
			</div>
		);
	};
	return side === 'left' ? renderLeftSide() : renderRightSide();
}

export default Sidenav;
