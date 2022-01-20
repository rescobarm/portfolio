import React, { Component } from 'react'

export default class CalendarCRUD extends Component {
    render() {
        return (
            <div>
                Calendario académico
            </div>
        )
    }
}


/*
import { resolve } from "path";
import React, { useState, useRef, useEffect, Fragment } from "react";

import { RTSAjax } from '../RTSAjax'
import { IAcademicCalendar } from  '../../models/AcademicTeachingLoad/ATLMdls' //../models/AcademicTeachingLoad/ATLMdls';
import { IOPTRspns } from '../../models/Helpers';

type eveElementForm = React.FormEvent<HTMLFormElement>;

const ajx: RTSAjax = new RTSAjax();

function App(): JSX.Element {
  const [calendarDate, setCalendarDate] = useState<string>("dd/mm/aaaa");
  const [calendarDesc, setCalendarDesc] = useState<string>("");
  const [calendarUnskilled, setCalendarUnskilled] = useState<boolean>(false);

  const [calendarDatas, setCalendarDatas] = useState<IAcademicCalendar[]>([]);
  const calendarInput = useRef<HTMLInputElement>(null);

  const addCalendarData = (date: IAcademicCalendar) => {
    const newDatas: IAcademicCalendar[] = [...calendarDatas, date];
    setCalendarDatas(newDatas);
  };

  const toggleDoneTask = (i: number) => {
    const tempCalendar: IAcademicCalendar[] = [...calendarDatas];
    tempCalendar[i].saved = !tempCalendar[i].saved;
    setCalendarDatas(tempCalendar);
  };

  const removeCalendar = async (i: number) => {
    const tempCalendar: IAcademicCalendar[] = [...calendarDatas];
    let r = await deleteDate(tempCalendar[i]);
    if(r === false){
      tempCalendar.splice(i, 1);
      setCalendarDatas(tempCalendar);
    }
    else
    {
      console.log(r);
    }
  };

  async function deleteDate(ac:IAcademicCalendar)
  {
    let msg: IOPTRspns = { option:0, value: JSON.stringify(ac), message:'Eliminar calendario académico' };
    const response = await ajx.RTSA_POST(msg);
    return await confirm_date_deleted(response);
  }

  async function confirm_date_deleted(msg: any)
  {
    const response: IOPTRspns = JSON.parse(msg);
    let acd: IAcademicCalendar = response.value;
    console.log(response.value);
    if(acd.saved === false)
      return acd.saved;
    else
      return response.message;
  }

  const handleSubmit = async (eve: eveElementForm) => {
    eve.preventDefault();

    if (calendarDate === "dd/mm/aaaa") {
      console.log("Seleccione una fecha");
    } else if (calendarDesc === "") {
      console.log("Ingrese descripción de la fecha");
    } else {
      
      let cd: IAcademicCalendar = { date: calendarDate, description: calendarDesc, unskilled: calendarUnskilled, saved: true};
      let msg: IOPTRspns = { option:1, value: JSON.stringify(cd), message:'Insertar calendario académico' };

      const response = await ajx.RTSA_POST(msg);
      await display_calendar(response);
      calendarInput.current?.focus();
    }
  };

  async function display_calendar(msg: any)
  {
    const response: IOPTRspns = JSON.parse(msg);
    addCalendarData(response.value);
    setCalendarDate("dd/mm/aaaa");
    console.log(response);
  }


  return (
    <div className="container p-4 h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-6 offset-md-13 ">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="date"
                  value={calendarDate}
                  onChange={(e) => setCalendarDate(e.target.value)}
                  className="form-control"
                  ref={calendarInput}
                  autoFocus />

                <input type="checkbox" id="unskilled" value="first_checkbox" 
                  onChange={(e) => setCalendarUnskilled( e.target.checked )} />
                <label htmlFor="unskilled">&nbsp;Inh&aacute;bil</label>

                <input
                  type="text"
                  value={calendarDesc}
                  onChange={(e) => setCalendarDesc(e.target.value)}
                  placeholder="Decripción de la fecha"
                  className="form-control mt-2" />

                <button className="btn btn-success btn-block mt-2">
                  Guardar
                </button>
              </form>
            </div>
          </div>
          {
            calendarDatas.map((t: IAcademicCalendar, i: number) => (
                <div className="card card-body mt-2" key={i}>
                  <h3 style={{ textDecoration: t.unskilled ? "line-through" : "" }}>
                    { t.date } 
                  </h3>
                  <h5> {t.unskilled ? "inhábil" : "hábil"} </h5>
                  <p> {t.description} </p>
                  <div>
                    <button className="btn btn-danger" onClick={() => removeCalendar(i)} >
                      Borrar
                    </button>
                  </div>
                </div>
              )
            ).reverse()
          }
        </div>
      </div>
    </div>
  );
}
*/
//export default App;