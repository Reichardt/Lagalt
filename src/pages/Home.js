import Sidenav from "../components/Sidenav/Sidenav";
import MainHome from "../components/Main/MainHome";

function Home() {
    return (
        <div className='container'>
            <div className='row'>
                <Sidenav side={"left"} />
                <MainHome />
                <Sidenav side={"right"} />
            </div>
        </div>
    );
}

export default Home;
