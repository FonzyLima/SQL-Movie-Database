import '../styles/navbar.css'

const Navbar = () => {

    return ( 
        <nav className="navbar navbar-expand-lg sticky-top">

            <div className="container-fluid">
              <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                   <a className={`nav-link `} aria-current="page" href="#">HOME</a>
                  </li>
                  <li className="nav-item">
                    <a className={`nav-link`}>ABOUT</a>
                  </li>
                  {/* <li className="nav-item">
                    <a className={`nav-link `}>UPDATE</a>
                  </li>
                  <li className="nav-item d-flex">
                    <a className={`nav-link `}>DELETE</a>
                  </li> */}
                </ul>
                
              </div>
            </div>

        </nav>
    );
}
 
export default Navbar;