import avatar from "../assets/avatar.png"
import {Link} from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


const Header = ({name}) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light my-navbar mx-2 rounded">
                <div className="container justify-content-end">
                <div className="navbar-brand" href="#">
                    {name}{' '}
                    <Link to={`/profile`} className="">
                        <img
                        alt="doctor profile image"
                        // src={avatar}
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                        />
                    </Link>
                </div>
                </div>
            </nav>
        </>
    );
}
 
export default Header;