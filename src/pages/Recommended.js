import Sidenav from '../components/Sidenav/Sidenav';

function Recommended() {
	return (
		<div className="container">
			<div className="row">
				<Sidenav side={'left'} />
				<Sidenav side={'right'} />
			</div>
		</div>
	);
}

export default Recommended;
