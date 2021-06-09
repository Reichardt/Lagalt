import React from 'react';
import Search from '../Search/Search';
import SidenavAuth from './SidenavAuth';
import SidenavItem from './SidenavItem';
import { FaHome } from 'react-icons/fa';
import { FaFire } from 'react-icons/fa';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { FaElementor } from 'react-icons/fa';
import SideRecent from './SideRecent';

function Sidenav({ side }) {
	const renderLeftSide = () => {
		return (
			<div className="bg-content col-lg-3 border-dark text-darken sticky-top align-self-start p-4">
				<SidenavItem title={'home'} icon={<FaHome />} link={'/'} />
				<SidenavItem
					title={'hot'}
					icon={<FaFire className="fire-icon" />}
					link={'/hot'}
				/>
				<SidenavItem
					title={'categories'}
					icon={<FaElementor />}
					link={'/categories'}
				/>
				<SidenavItem
					title={'notifications'}
					icon={<FaEnvelopeOpenText />}
					link={'/notifications'}
				/>
				<SidenavAuth />
			</div>
		);
	};

	const renderRightSide = () => {
		return (
			<div className="bg-content border-dark col-lg-3 text-darken sticky-top align-self-start pt-4">
				<Search />
				<SideRecent />
			</div>
		);
	};
	return side === 'left' ? renderLeftSide() : renderRightSide();
}

export default Sidenav;
