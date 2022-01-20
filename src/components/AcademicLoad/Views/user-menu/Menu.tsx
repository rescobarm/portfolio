import React, { Component } from 'react'
import { Link, Outlet } from 'react-router-dom'
import image from '../../../Assets/iexpro.png';
//'../../../../components/Assets/iexpro.png';
 //'./components/Assets/iexpro.png';

interface Props {
    
}
interface State {
    
}

export default class Menu extends Component<Props, State> {
    state = {}
    constructor(props: Props) {
        super(props);
    }

    private onMenuClick() {
        console.log("HOLA MENUSUCO");
    }

    render() {
        return (
              <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ borderBottom:'5px solid darkgreen'}}>
                <div className="container-fluid ">
                    <a style={{display:'none'}} className="btn btn-primary btn-lg active" target='_self' href="https://sae.universidadiexpro.edu.mx/myadmin/paneliexpro/index2.php">
                    SAE
                    </a>
                    <img src={image} width="30px" height="25px" alt="" />
                    <button onClick={()=> { this.onMenuClick();
                    }}
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation" 
                    style={{ cursor:'pointer' }}
                    >
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item btn-outline-success">
                            <Link className="nav-link active " to="/">HOME</Link>
                            </li>
                            <li className="nav-item btn-outline-success">
                            <Link className="nav-link" to="/Disponibilities">Disponibilidad</Link>
                            </li>
                            <li className="nav-item btn-outline-success">
                            <Link className="nav-link" to="/AcademicLoads/0&0">Carga Académica</Link>
                            </li>
                            <li className="nav-item btn-outline-success">
                            <Link className="nav-link" to="/AcademicCalendar">Calendario Escolar</Link>
                            </li>
                            <li>
                                <a href="#">||</a>
                            </li>
                            <li style={{display:'none'}} className="nav-item btn-outline-success">
                                <Link className="nav-link active " to="/Test">TEST</Link>
                            </li>
                            <li className="nav-item btn-outline-success">
                                <Link className="nav-link" to="/Availability">Disponibilidad V0.001</Link>
                            </li>
                            <li className="nav-item btn-outline-success">
                                <Link className="nav-link" to="/AcademicLoadSEL">CA-SEL V0.001</Link>
                            </li>
                        </ul>
                        <form className="d-flex btn-outline-success">
                            <a style={{display:'none'}} className="btn btn-outline-success" target='_self' href="https://iexpro.edu.mx/laboratoriosaevirtual_v1/myadmin/paneliexpro/index.php">
                            SAE
                            </a>
                            <a className="btn btn-outline-success" target='_self' href="https://sae.universidadiexpro.edu.mx/myadmin/paneliexpro/index2.php">
                            SAE
                            </a>
                        </form>
                    </div>
                </div>
              </nav>

            
        )
    }
}

//export default Menu
