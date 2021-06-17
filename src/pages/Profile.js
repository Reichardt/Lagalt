import Sidenav from '../components/Sidenav/Sidenav';
import ProfileMain from '../components/Profile/ProfileMain';

function Profile({ match }) {
	return (
		<div className="container">
			<div className="d-flex">
				<Sidenav side={'left'} />
				<ProfileMain username={match.params.name} />
			</div>
		</div>
	);
}

export default Profile;
