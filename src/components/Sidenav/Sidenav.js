import React from 'react';
import Search from '../Search/Search';
import SidenavAuth from './SidenavAuth';
import SidenavItem from './SidenavItem';
import SidenavLogo from './SidenavLogo';
import { HouseDoorFill, ListTask } from 'react-bootstrap-icons';
import SidenavRecent from './SidenavRecent';

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
			<div className="col-lg-3">
				<div className="border-dark text-darken sticky-top align-self-start pt-4 pb-2 search-container">
					<Search />
				</div>
				<div className="border-dark text-darken sticky-top align-self-start pt-5">
					<SidenavRecent />
				</div>
			</div>
		);
	};
	return side === 'left' ? renderLeftSide() : renderRightSide();
}

export default Sidenav;
