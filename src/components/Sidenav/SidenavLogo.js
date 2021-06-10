import { Link } from 'react-router-dom';
import logo from '../../logo.png';

const SidenavLogo = () => {
	return (
		<div className="img-wrapper mb-3">
			<Link to="/">
				<img src={logo} style={logoStyles} alt="logo" />
			</Link>
		</div>
	);
};

export default SidenavLogo;

const logoStyles = {
	width: '4em',
};
