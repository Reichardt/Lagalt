import Sidenav from "../components/Sidenav/Sidenav";
import MainProfile from "../components/Profile/MainProfile";

function Profile({ match }) {
    return (
        <div className='container'>
            <div className='d-flex'>
                <Sidenav side={"left"} />
                <MainProfile username={match.params.name} />
            </div>
        </div>
    );
}

export default Profile;
