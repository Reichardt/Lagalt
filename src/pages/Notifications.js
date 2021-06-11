import Sidenav from '../components/Sidenav/Sidenav';

function Notifications() {
	return (
		<div className="container">
			<div className="row">
				<Sidenav side={'left'} />
				<Sidenav side={'right'} />
			</div>
		</div>
	);
}

export default Notifications;
