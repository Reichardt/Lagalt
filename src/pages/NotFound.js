import { Link } from "react-router-dom";
import Sidenav from "../components/Sidenav/Sidenav";

function NotFound() {
    return (
        <div>
            <div className='container'>
                <div className='d-flex'>
                    <Sidenav side={"left"} />
                    <div className='col-lg-9'>
                        <div className='bg-content border-bottom border-start border-end border-secondary text-darken p-3'>
                            <p className='fw-bold m-0'>404 NOT FOUND</p>
                        </div>
                        <div className='bg-content border-bottom border-start border-end border-secondary text-darken p-3'>
                            <p>The page you requested was not found</p>
                            <Link to='/'>Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
