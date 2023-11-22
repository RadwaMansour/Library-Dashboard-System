
import { removeAuthUser, getAuthUser } from "../helper/Storage";
import "../style/sidebar.css"
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const Logout = () => {
    removeAuthUser();
  };

  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        <li>
          <Link to="/" className="row" >Home</Link>
        </li>
       
        
        {/* unAuthenticated Routes */}
        {!auth && (
          <>
             
             <li>
              <Link to="/logIn" className="row" >LogIn</Link>
            </li>
            
             </>
        )}

        {/*Admin Routes */}

        {auth && auth.type === 1 && auth.status === 1 && (
          <>
           <li>
          <Link to="/manageRequests" className="row" >Manage Request</Link>
        </li>
        <li>
          <Link to="/manageBooks" className="row" >Manage Books </Link>
        </li>
            <li>
            <Link to="/manageReaders" className="row" >Manage Readers</Link>
          </li>

          </>
        )}

        {/* Authenticated Routes */}
        {auth && auth.type === 0 && auth.status === 1 &&(
        <>
        <li>
             <Link to="/viewBooks" className="row" >View Books</Link>
             </li>
             <li>
             <Link to="/Requests" className="row" >Requests</Link>
             </li>
        </>)} 
        {/* signup-Authenticated Routes */}
        
        {auth && (
        <>
        <li><Link to="/" onClick={Logout} className="row" >Logout</Link></li>
        </>)} 
      </ul>
    </div>

  );
}

export default Sidebar;
