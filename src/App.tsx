// COORDINACIÓN ACADÉMICA Y SERVICIOS ESCOLARES EN LÍNEA
import * as React from "react";
import { Routes, Route, Outlet, Link, Params } from "react-router-dom";
import AcademicLoads from "./components/AcademicLoad/Views/AcademicLoads";
import Disponibilities from "./components/AcademicLoad/Views/Disponibilities";
import { Normalize } from "styled-normalize";
//BOOTSTRAP 5.1
import "./css/App.css";
import './components/AcademicLoad/Views/css/index.css';
import AcademicLoadConf from "./components/AcademicLoad/Views/AcademicLoadConf";

import image from './components/Assets/iexpro.png';
import AcademicCalendar from "./components/AcademicLoad/Views/AcademicCalendar";
import Availability from "./components/AcademicLoad/Views/Availability";
import Home from "./components/AcademicLoad/Views/Home";
import Test from "./components/AcademicLoad/Views/Test";
import AcademicLoadSEL from "./components/AcademicLoad/Views/AcademicLoadSEL";

//import  db from './firebase/firebaseConf';
import {getFirestore, collection, getDocs } from 'firebase/firestore'
import { Console } from "console";
import { useEffect } from "react";
import Menu from "./components/AcademicLoad/Views/user-menu/Menu";
import _main_ from "./components/AcademicLoad/Views/_main_";
import UsrDshbrd from "./systms/usrs/views/UsrDshbrd";
import __main__ from "./systms/__main__";
import { SignUp } from "./systms/usrs/views/SignUp";
import { MenuCRUD } from "./systms/usrs/views/MenuCRUD";

export default function App() {
/*
  useEffect(() => {
    const getDataFB = async () => {
      console.log('**FIREBASE*START*******************');
      const _itemUserMenuCllctn = collection(db, '_itemUserMenu');//.collection("_itemUserMenu")
      const _itemUserMenuDoc = await getDocs(_itemUserMenuCllctn);
      const userMenu = _itemUserMenuDoc.docs.map(doc => doc.data());      
      console.log(userMenu);
      console.log('**FIREBASE*END**************************');
      //return cityList;
    }
    
    getDataFB();
  }, []);
*/
  return (
    <div className="app_css">
      {/* Routes nest inside one another. Nested route paths build upon
              parent route paths, and nested route elements render inside
              parent route elements. See the note about <Outlet> below. */}

      <Routes>
        <Route path="/" element={<__main__ />}>
          <Route index element={<UsrDshbrd />} />
          <Route path="*" element={<UsrDshbrd />} />{/* Using path="*"" means "match anything", so this route acts like a catch-all for URLs that we don't have explicit routes for. */}          
          <Route path="AcademicLoads/:id&:idG" element={<AcademicLoads />} />
          <Route
            path="AcademicLoadConf/:id&:career&:idG&:group"
            element={<AcademicLoadConf />}
          />
          <Route path="MenuCRUD" element={<MenuCRUD />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="Disponibilities" element={<Disponibilities />} />
          <Route path="AcademicLoadSEL" element={<AcademicLoadSEL />} />
          <Route path="AcademicCalendar" element={<AcademicCalendar />} />
          <Route
            path="#"
            element={<Home />}
          />
          <Route path="Test" element={<Test/>} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {

  return (
    <div className="layout_css">
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}


      <div className="outlet_css">
        <Outlet />
      </div>
    </div>
  );
}

/*function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}*/

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div className="alig">
      <img className="img-fluid" style={{height:850}} src={image} alt="some else???" />
    </div>
  );
}
/*
import {  Outlet, Link } from 'react-router-dom';
export default function App(): JSX.Element {
  
  return (

    <div className="p-3">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="btn btn-primary btn-lg active" href="https://iexpro.edu.mx/laboratoriosaevirtual_v1/myadmin/paneliexpro/index.php">
          SAE
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">              
              <Link className="nav-link" to="/AcademicLoads">Carga Académica</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Disponibilities">Disponibilidad</Link>
            </li>
            <li className="nav-item">              
              <Link className="nav-link" to="/Disponibilities">Calendario académico</Link>
            </li>
          </ul>
        </div>
      </nav>  
      <div className="border border-secondary p-3 mt-2">
        <Outlet />
      </div>   
    </div>
  );  
}
*/
/*

      <div className="border border-secondary p-3 mt-2">
        <Outlet />
      </div>  
-----------------------------------


    <BrowserRouter>   
      <Routes>
        <Route path="/" element={<Disponibilities />} />
        <Route path="disponibilidad" element={<Disponibilities />} />
        <Route path="cargaAcademica" element={<Disponibilities />} />
        <Route path="calendarioAcademico" element={<CalendarCRUD />} />
      </Routes>  
    </BrowserRouter>
*/
//export default App;
