

import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css'
import { Normalize } from 'styled-normalize';
//import 'bootswatch/dist/lumen/bootstrap.min.css';


render(
  <React.StrictMode>    
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

/*
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>                
        <Route path="/" element={<App />} >
          <Route path="AcademicLoads" element={<AcademicLoads />} />
          <Route path="Disponibilities" element={<Disponibilities />} />
          <Route path="AcademicCalendar" element={<AcademicCalendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
-----------------------------------------------------------
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Disponibilities from "./components/AcademicLoad/Views/Disponibilities";
import 'bootswatch/dist/lumen/bootstrap.min.css';
import AcademicLoads from "./components/AcademicLoad/Views/AcademicLoads";
import AcademicCalendar from "./components/AcademicLoad/Views/AcademicCalendar";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>    
    <App />
    <Routes>
      <Route path="AcademicLoads" element={<AcademicLoads />} />
      <Route path="Disponibilities" element={<Disponibilities />} />
      <Route path="AcademicCalendar" element={<AcademicCalendar />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
